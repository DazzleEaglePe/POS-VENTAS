import styled from "styled-components";
import { blur_in } from "../../styles/keyframes";
import {
  Btn1,
  Footer,
  Generarcodigo,
  InputText2,
  Linea,
  Lottieanimacion,
  Title,
  useAuthStore,
} from "../../index";
import { v } from "../../styles/variables";
import { Device } from "../../styles/breakpoints";
import animacionlottie from "../../assets/navidad.json";
import { NieveComponente } from "../organismos/NieveComponente";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { CardModos } from "../organismos/LoginDesign/CardModos";
import { VolverBtn } from "../moleculas/VolverBtn";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
export function LoginTemplate() {
  const [stateModos, setStateModos] = useState(true);
  const [stateModo, setStateModo] = useState("empleado");
  const [showPassword, setShowPassword] = useState(false);
  const { loginGoogle, loginEmail, crearUserYLogin, resetPasswordEmail } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending: isPendingLogin } = useMutation({
    mutationKey: ["iniciar con email"],
    mutationFn: loginEmail,
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Sesión iniciada");
      navigate("/dashboard");
    },
  });
  const { mutate: mutateTester, isPending } = useMutation({
    mutationKey: ["iniciar con email tester"],
    mutationFn: crearUserYLogin,
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSuccess: () => {
      //queryClient.invalidateQueries();
      // window.location.reload();
    },
  });
  const manejadorEmailSesionTester = () => {
    mutateTester({ email: "tester1@gmail.com", password: "123456" });
  };
  const manejadorEmailSesion = (data) => {
    mutate({ email: data.email, password: data.password });
  };
  const handleForgotPassword = async () => {
    // Tomamos el email ya tipeado si existe, y validamos formato básico
    const emailInput = document.querySelector('input[placeholder="email"]');
    const emailValue = emailInput?.value || "";
    if (!emailValue) {
      toast.error("Ingresa tu email para enviarte el enlace");
      return;
    }
    try {
      await resetPasswordEmail(emailValue);
      toast.success("Revisa tu correo para restablecer la contraseña");
    } catch (e) {
      toast.error(e.message || "No se pudo enviar el correo");
    }
  };
  const manejarCrearUSerTester = () => {
    const response = Generarcodigo({ id: 2 });
    const gmail = "@gmail.com";
    const correoCompleto = response.toLowerCase() + gmail;
    mutateTester({ email: correoCompleto, password: "123456" });
  };
  return (
    <Container>
      <Toaster />
      <div className="card">
        <ContentLogo>
          <img src={v.logo} />
          <span>Minimarket</span>
        </ContentLogo>
        <Title $paddingbottom="40px">Ingresar Modo</Title>
        {stateModos && (
          <ContentModos>
            <CardModos
              title={"Super admin"}
              subtitle={"crea y gestiona tu empresa"}
              bgcolor={"#ed7323"}
              img={"https://i.ibb.co/TDXYj7r9/rey.png"}
              funcion={() => {
                setStateModo("superadmin");
                setStateModos(!stateModos);
              }}
            />
            <CardModos
              title={"Empleado"}
              subtitle={"vende y crece"}
              bgcolor={"#542a1b"}
              img={"https://i.ibb.co/ksfCmJyy/casco.png"}
              funcion={() => {
                setStateModo("empleado");
                setStateModos(!stateModos);
              }}
            />
          </ContentModos>
        )}
        {stateModo === "empleado"
          ? stateModos === false && (
              <PanelModo>
                <VolverBtn funcion={() => setStateModos(!stateModos)} />
                <Header>
                  <Icon icon="solar:login-2-bold-duotone" width={26} height={26} />
                  <Title $paddingbottom="0">Iniciar sesión</Title>
                </Header>
                <Helper>Ingresa tus credenciales para continuar.</Helper>
                <form onSubmit={handleSubmit(manejadorEmailSesion)}>
                  <InputText2>
                    <input
                      className="form__field"
                      placeholder="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={errors.email ? "true" : "false"}
                      {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                          value:
                            /^(?:[a-zA-Z0-9_'^&amp;+%$#!`~{}\-]+(?:\.[a-zA-Z0-9_'^&amp;+%$#!`~{}\-]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                          message: "Email no válido",
                        },
                      })}
                    />
                  </InputText2>
                  {errors.email && (
                    <ErrorMsg role="alert">{errors.email.message}</ErrorMsg>
                  )}

                  <div className="password-row">
                    <InputText2 style={{ flex: 1 }}>
                      <input
                        className="form__field"
                        placeholder="contraseña"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        aria-invalid={errors.password ? "true" : "false"}
                        {...register("password", {
                          required: "La contraseña es obligatoria",
                          minLength: {
                            value: 6,
                            message: "Mínimo 6 caracteres",
                          },
                        })}
                      />
                    </InputText2>
                    <TogglePass
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      <Icon
                        icon={showPassword ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"}
                        width={24}
                        height={24}
                      />
                    </TogglePass>
                  </div>
                  {errors.password && (
                    <ErrorMsg role="alert">{errors.password.message}</ErrorMsg>
                  )}

                  <ExtrasRow>
                    <label className="remember">
                      <input type="checkbox" /> Recordarme
                    </label>
                    <button type="button" className="link-muted" onClick={handleForgotPassword}>
                      Olvidé mi contraseña
                    </button>
                  </ExtrasRow>

                  <Btn1
                    border="2px"
                    titulo={isPendingLogin ? "INGRESANDO…" : "INGRESAR"}
                    bgcolor="#1CB0F6"
                    color="255,255,255"
                    width="100%"
                    disabled={isPendingLogin}
                  />
                </form>
              </PanelModo>
            )
          : stateModos === false && (
              <PanelModo>
                <VolverBtn funcion={() => setStateModos(!stateModos)} />
                <span>Modo super admin</span>
                <Btn1
                  disabled={isPending}
                  funcion={manejarCrearUSerTester}
                  border="2px"
                  titulo={isPending ? "CREANDO…" : "MODO INVITADO"}
                  bgcolor="#f6ce1c"
                  color="255,255,255"
                  width="100%"
                />
                <Linea>
                  <span>0</span>
                </Linea>
                <Btn1
                  border="2px"
                  funcion={loginGoogle}
                  titulo="Google"
                  bgcolor="#fff"
                  icono={<v.iconogoogle />}
                />
              </PanelModo>
            )}
      </div>
      <Footer />
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 0 10px;
  color: ${({ theme }) => theme.text};
  background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08));
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
    width: 100%;
    margin: 20px;
    padding: 24px;
    backdrop-filter: blur(6px);
    border: 1px solid ${({ theme }) => theme.color2};
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  animation: ${blur_in} .35s ease-out;
  transition: box-shadow .2s ease, border-color .2s ease, transform .08s ease;
  &:hover{ box-shadow: 0 10px 28px rgba(0,0,0,0.14); border-color: ${({ theme }) => theme.color1}; }
  &:active{ transform: scale(.999); }
    @media ${Device.tablet} {
      width: 400px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .password-row{
    display:flex;
    gap:10px;
    align-items:center;
  }
`;
const ContentLogo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  span {
    font-weight: 700;
  }
  img {
    width: 10%;
  }
`;
const ContentModos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const PanelModo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display:flex; align-items:center; gap:10px;
`;

const Helper = styled.p`
  font-size: .95rem; opacity:.8; margin: 0;
`;

const TogglePass = styled.button`
  border: 1px solid ${({ theme }) => theme.color2};
  background: ${({ theme }) => theme.bgAlpha};
  color: ${({ theme }) => theme.text};
  height: 42px;
  width: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  transition: transform .1s ease;
  &:hover{ transform: scale(1.02); }
`;

const ErrorMsg = styled.small`
  color: #ef4444;
  text-align: left;
  margin: -4px 4px 6px;
  font-weight: 600;
`;

const ExtrasRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  .remember{
    display:flex;
    align-items:center;
    gap:8px;
  }
  .link-muted{
    color: ${({ theme }) => theme.text};
    opacity: .8;
    text-decoration: underline;
  }
`;
