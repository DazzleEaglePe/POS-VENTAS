import { create } from "zustand";
import { supabase } from "../index";

export const useAuthStore = create(() => ({
  loginGoogle: async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  },
  cerrarSesion: async () => {
    await supabase.auth.signOut();
 
  },
  loginEmail: async (p) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.email,
      password: p.password,
    });
    if (error) {
      if (error.status === 400) {
        throw new Error("Correo o contraseña incorrectos");
      } else {
        throw new Error("Error al iniciar sesión: " + error.message);
      }
    }
    return data.user
  },
  crearUserYLogin:async(p)=>{
    const { data } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,
      
    })
    return data.user
  },
  resetPasswordEmail: async (email) => {
    const appUrl = (typeof window !== 'undefined' && window.location.origin) || '';
    const envUrl = typeof import.meta !== 'undefined' ? import.meta.env.VITE_PUBLIC_SITE_URL : '';
    const baseUrl = envUrl || appUrl;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/reset`,
    });
    if (error) throw new Error(error.message);
    return data;
  },
  updatePassword: async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
    return data;
  },
  // obtenerIdAuthSupabase: async () => {
  //     const response = await ObtenerIdAuthSupabase();
  //     return response;
  //   },
}));
