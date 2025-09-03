import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabase/supabase.config";
import { MostrarUsuarios, InsertarEmpresa } from "../index";
// import { requestAdminApproval } from "../utils/adminApproval"; // Admin approval (disabled)
import PropTypes from "prop-types";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  // null when unknown/unauthenticated; truthy only when a normal (non-recovery) session is active
  const [user, setUser] = useState(null);
  const [isRecovering, setIsRecovering] = useState(false);
  const recoveringRef = useRef(false);

  const beginRecovery = () => {
    setIsRecovering(true);
    recoveringRef.current = true;
    setUser(null);
  try { localStorage.setItem('sb_recovering', '1'); } catch (e) { /* ignore storage errors */ }
  };
  const endRecovery = () => {
    setIsRecovering(false);
    recoveringRef.current = false;
    setUser(null);
  try { localStorage.removeItem('sb_recovering'); } catch (e) { /* ignore storage errors */ }
  };

  // If the app loads directly on /reset, mark as recovering immediately
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize from URL or storage
      if (window.location.pathname === '/reset' || localStorage.getItem('sb_recovering') === '1') {
        beginRecovery();
      }
      // Sync across tabs
      const onStorage = (e) => {
        if (e.key === 'sb_recovering') {
          if (e.newValue === '1') beginRecovery();
          else endRecovery();
        }
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }
  }, []);
  
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const isRecoveryLink = hash?.includes('type=recovery');

      if (event === 'PASSWORD_RECOVERY' || isRecoveryLink) {
        beginRecovery();
        return;
      }

  // While recovering, ignore subsequent auth events to avoid treating as signed-in
  // but allow SIGNED_OUT to clear recovery state
  const recoveringFlag = (() => { try { return localStorage.getItem('sb_recovering') === '1'; } catch { return false; } })();
  if ((recoveringRef.current || recoveringFlag) && event !== 'SIGNED_OUT') {
        setUser(null);
        return;
      }

      if (event === 'SIGNED_OUT' || session == null) {
        endRecovery();
        return;
      }

  // Sesión normal
      setIsRecovering(false);
      recoveringRef.current = false;
      if (session?.user && !isEmailAllowed(session.user.email)) {
        // Enforce allowlist: sign out and block access
        await supabase.auth.signOut();
        setUser(null);
        return;
      }
  // Admin approval gate (disabled)
  // if (session?.user && (import.meta?.env?.VITE_2FA_MODE || '').toLowerCase() === 'admin_approval') {
  //   const exists = await MostrarUsuarios({ id_auth: session.user.id });
  //   if (!exists) {
  //     await requestAdminApproval({ id_auth: session.user.id, email: session.user.email });
  //     try { localStorage.setItem('sb_approval_pending', '1'); } catch (e) { /* ignore */ }
  //     await supabase.auth.signOut();
  //     setUser(null);
  //     return;
  //   } else {
  //     try { localStorage.removeItem('sb_approval_pending'); } catch (e) { /* ignore */ }
  //   }
  // }
      setUser(session?.user ?? null);
      if (session?.user) {
        insertarDatos(session.user.id, session.user.email);
      }
    });
    return () => {
      subscription.subscription?.unsubscribe?.();
    };
  }, []);
  const insertarDatos = async (id_auth, correo) => {
    const response = await MostrarUsuarios({ id_auth: id_auth }); 
    const autoProvision = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_AUTO_PROVISION) === 'true';
    if (response) return;
    if (autoProvision) {
      await InsertarEmpresa({ id_auth: id_auth, correo: correo });
    }
  };

  const isEmailAllowed = (email) => {
    try {
      const domains = (import.meta?.env?.VITE_ALLOWED_EMAIL_DOMAINS || '').split(',').map(s => s.trim()).filter(Boolean);
      const emails = (import.meta?.env?.VITE_ALLOWED_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      if (!email) return false;
      const lower = email.toLowerCase();
      const domain = lower.split('@')[1] || '';
      if (emails.length && emails.includes(lower)) return true;
      if (domains.length && domains.includes(domain)) return true;
      // If neither list provided, allow by default
      if (!emails.length && !domains.length) return true;
      return false;
    } catch {
      return true;
    }
  };

  return (
  <AuthContext.Provider value={{ user, isRecovering, beginRecovery, endRecovery }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
