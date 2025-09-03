import styled from "styled-components";
import { blur_in } from "../../styles/keyframes";
import { Btn1, Title, useAuthStore, UserAuth } from "../../index";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ResetPasswordTemplate() {
  const { updatePassword, cerrarSesion } = useAuthStore();
  const { isRecovering, endRecovery } = UserAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");
  const confirm = watch("confirm", "");
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const checks = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial];
  const strength = (checks.filter(Boolean).length / checks.length) * 100;
  const canSubmit = strength >= 60 && password === confirm && !isSubmitting;

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const onSubmit = async ({ password }) => {
    try {
      await updatePassword(password);
  // Cerrar sesión para evitar mantener una sesión de recuperación activa
  await cerrarSesion();
      toast.success("Contraseña actualizada. Redirigiendo…");
      setTimeout(() => navigate("/login"), 1200);
    } catch (e) {
      toast.error(e.message || "No se pudo actualizar la contraseña");
    }
  };

  const handleCancelRecovery = async () => {
    try {
      await cerrarSesion();
    } catch (e) {
      // ignorar errores de signout
    } finally {
      endRecovery?.();
      navigate("/login", { replace: true });
    }
  };

  return (
    <Container>
      <Toaster />
      <Card>
        <Header>
          <Icon icon="solar:lock-keyhole-bold-duotone" width={28} height={28} />
          <Title $paddingbottom="0">Restablecer contraseña</Title>
        </Header>
        <Helper>{isRecovering ? "Ingresa tu nueva contraseña y confírmala. Recomendamos una contraseña segura." : "Si llegaste aquí sin un enlace de recuperación, inicia sesión o solicita el correo de recuperación desde la pantalla de login."}</Helper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label>Nueva contraseña</label>
            <div className="input-row">
              <input
                type={show1 ? "text" : "password"}
                autoComplete="new-password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Requerido",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                })}
              />
              <TogglePass type="button" onClick={() => setShow1((s) => !s)} aria-label={show1 ? "Ocultar" : "Mostrar"}>
                <Icon icon={show1 ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} width={22} height={22} />
              </TogglePass>
            </div>
            {errors.password && <small className="err">{errors.password.message}</small>}
          </div>

          <Strength>
            <div className="bar" style={{ width: `${strength}%` }} />
            <ul>
              <li className={hasLength ? "ok" : "ko"}><Icon icon={hasLength ? "solar:check-circle-bold" : "solar:close-circle-bold"} /> 8+ caracteres</li>
              <li className={hasUpper ? "ok" : "ko"}><Icon icon={hasUpper ? "solar:check-circle-bold" : "solar:close-circle-bold"} /> Mayúscula</li>
              <li className={hasLower ? "ok" : "ko"}><Icon icon={hasLower ? "solar:check-circle-bold" : "solar:close-circle-bold"} /> Minúscula</li>
              <li className={hasNumber ? "ok" : "ko"}><Icon icon={hasNumber ? "solar:check-circle-bold" : "solar:close-circle-bold"} /> Número</li>
              <li className={hasSpecial ? "ok" : "ko"}><Icon icon={hasSpecial ? "solar:check-circle-bold" : "solar:close-circle-bold"} /> Símbolo</li>
            </ul>
          </Strength>

          <div className="field">
            <label>Confirmar contraseña</label>
            <div className="input-row">
              <input
                type={show2 ? "text" : "password"}
                autoComplete="new-password"
                aria-invalid={errors.confirm ? "true" : "false"}
                {...register("confirm", {
                  required: "Requerido",
                  validate: (v) => v === password || "No coincide",
                })}
              />
              <TogglePass type="button" onClick={() => setShow2((s) => !s)} aria-label={show2 ? "Ocultar" : "Mostrar"}>
                <Icon icon={show2 ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} width={22} height={22} />
              </TogglePass>
            </div>
            {errors.confirm && <small className="err">{errors.confirm.message}</small>}
          </div>

          <BtnRow>
            <Btn1
              border="2px"
              titulo={isSubmitting ? "GUARDANDO…" : "GUARDAR"}
              bgcolor={canSubmit ? "#10b981" : "#86efac"}
              color="255,255,255"
              width="100%"
              disabled={!canSubmit}
            />
              <a className="link" onClick={handleCancelRecovery}>Volver a iniciar sesión</a>
          </BtnRow>
        </form>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08));
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.color2};
  border-radius: 12px;
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  color: ${({ theme }) => theme.text};
  animation: ${blur_in} .35s ease-out;
  transition: box-shadow .2s ease, border-color .2s ease, transform .08s ease;
  &:hover{ box-shadow: 0 10px 28px rgba(0,0,0,0.14); border-color: ${({ theme }) => theme.color1}; }
  &:active{ transform: scale(.999); }

  p { opacity: .9; margin-bottom: 16px; }

  .field { display:flex; flex-direction:column; gap:6px; margin-bottom: 12px; }
  .input-row{ display:flex; gap:8px; align-items:center; }
  .field input { flex:1; height: 42px; padding: 0 12px; border-radius: 10px; border:1px solid ${({ theme }) => theme.color2}; background: transparent; color: ${({ theme }) => theme.text}; }
  .err { color: #ef4444; font-weight: 600; }
`;

const Header = styled.div`
  display:flex; align-items:center; gap:10px; margin-bottom:6px;
`;

const Helper = styled.p`
  font-size: .95rem; opacity:.8; margin: 0 0 16px 0;
`;

const TogglePass = styled.button`
  border: 1px solid ${({ theme }) => theme.color2};
  background: ${({ theme }) => theme.bgAlpha};
  color: ${({ theme }) => theme.text};
  height: 42px; width: 42px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 10px; cursor: pointer; transition: transform .1s ease;
  &:hover{ transform: scale(1.02); }
`;

const Strength = styled.div`
  margin: 6px 0 12px;
  .bar{ height: 6px; border-radius: 10px; background: linear-gradient(90deg, #ef4444, #f59e0b, #22c55e); }
  ul{ list-style:none; padding:0; margin:8px 0 0; display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:6px; }
  li{ display:flex; align-items:center; gap:6px; font-size:.9rem; opacity:.85; }
  .ok{ color:#22c55e; }
  .ko{ color:#ef4444; }
`;

const BtnRow = styled.div`
  display:flex; flex-direction:column; gap:10px; margin-top: 8px;
  .link{ text-align:center; text-decoration:underline; opacity:.85; cursor:pointer; }
`;
