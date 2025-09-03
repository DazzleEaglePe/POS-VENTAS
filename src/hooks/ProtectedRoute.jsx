import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { UserAuth } from "../context/AuthContent";
import { usePermisosStore } from "../store/PermisosStore";
import { useQuery } from "@tanstack/react-query";
import { useUsuariosStore } from "../store/UsuariosStore";

export const ProtectedRoute = ({ children, accessBy }) => {
  const { user, isRecovering } = UserAuth();
  const {mostrarPermisosGlobales } = usePermisosStore();
  const location = useLocation();
  const {datausuarios} = useUsuariosStore()

  const {
    data:dataPermisosGlobales,
    isLoading: isLoadingPermisosGlobales,
  } = useQuery({
    queryKey: ["mostrar permisos globales", datausuarios?.id],
    queryFn: () => mostrarPermisosGlobales({ id_usuario: datausuarios?.id }),
    enabled: !!datausuarios,
  });
  if(isLoadingPermisosGlobales){
    // return <span>cargando permisos...</span>
  }
  // Admin approval (disabled): redirect to /pending if local pending flag exists
  // const isPendingApproval = (() => { try { return localStorage.getItem('sb_approval_pending') === '1'; } catch { return false; } })();
  // if (isPendingApproval && location.pathname !== "/pending") {
  //   return <Navigate to="/pending" replace />;
  // }
  const hasPermission = dataPermisosGlobales?.some(
    (item) => item.modulos?.link === location.pathname
  );
 
  // If user is in password recovery flow, always force them to /reset until completed
  if (isRecovering && location.pathname !== "/reset") {
    return <Navigate to="/reset" replace />;
  }

  if (accessBy === "non-authenticated") {
    // If recovering, redirect to /reset instead of rendering non-auth pages like /login
    if (isRecovering) return <Navigate to="/reset" replace />;
    if (!user) {
      return children;
    }
    return <Navigate to="/" />;
  } else if (accessBy === "authenticated") {
    // Block access to authenticated routes while recovering
    if (user && !isRecovering) {
      if (!hasPermission) {
        // return <Navigate to="/404" />;
      } 
 
      return children;
    }
  }
  return <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  accessBy: PropTypes.oneOf(["authenticated", "non-authenticated"]).isRequired,
};
