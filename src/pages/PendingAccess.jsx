// // Pending page for admin approval (currently not used)
// import styled from "styled-components";
// import { Title } from "../index";
// import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";

// export function PendingAccess() {
//   const navigate = useNavigate();
//   const adminEmail = import.meta?.env?.VITE_ADMIN_APPROVAL_EMAIL || "admin@empresa.com";
//   const handleBack = () => {
//     try { localStorage.removeItem('sb_approval_pending'); } catch (e) { /* ignore */ }
//     navigate('/login', { replace: true });
//   };
//   return (
//     <Container>
//       <Card>
//         <Header>
//           <Icon icon="solar:shield-check-bold-duotone" width={28} height={28} />
//           <Title $paddingbottom="0">Acceso pendiente de aprobación</Title>
//         </Header>
//         <p>
//           Tu solicitud fue enviada al administrador. En cuanto sea aprobada, podrás iniciar sesión.
//         </p>
//         <Info>
//           <Icon icon="solar:mailbox-bold-duotone" width={22} height={22} />
//           <span>Contacto del administrador: <b>{adminEmail}</b></span>
//         </Info>
//         <Btn onClick={handleBack}>Entendido, volver al login</Btn>
//       </Card>
//     </Container>
//   );
// }

// const Container = styled.div`
//   min-height: 100vh; display:flex; align-items:center; justify-content:center;
//   background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08));
// `;
// const Card = styled.div`
//   width: 100%; max-width: 520px; padding: 24px; border: 1px solid ${({ theme }) => theme.color2};
//   border-radius: 12px; backdrop-filter: blur(6px); box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//   color: ${({ theme }) => theme.text};
//   p{ opacity:.9; }
// `;
// const Header = styled.div`
//   display:flex; align-items:center; gap:10px; margin-bottom:6px;
// `;
// const Info = styled.div`
//   display:flex; align-items:center; gap:8px; margin: 12px 0 18px; opacity:.9;
// `;
// const Btn = styled.button`
//   width: 100%; padding: 10px 14px; border-radius: 10px;
//   background:#1CB0F6; color:#fff; border:2px solid rgba(255,255,255,.3);
// `;
// import styled from "styled-components";
// import { Title } from "../index";
// import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";

// export function PendingAccess() {
//   const navigate = useNavigate();
//   const adminEmail = import.meta?.env?.VITE_ADMIN_APPROVAL_EMAIL || "jeanavila2109@gmail.com";
//   const handleBack = () => {
//     try { localStorage.removeItem('sb_approval_pending'); } catch (e) { /* ignore */ }
//     navigate('/login', { replace: true });
//   };
//   return (
//     <Container>
//       <Card>
//         <Header>
//           <Icon icon="solar:shield-check-bold-duotone" width={28} height={28} />
//           <Title $paddingbottom="0">Acceso pendiente de aprobación</Title>
//         </Header>
//         <p>
//           Tu solicitud fue enviada al administrador. En cuanto sea aprobada, podrás iniciar sesión.
//         </p>
//         <Info>
//           <Icon icon="solar:mailbox-bold-duotone" width={22} height={22} />
//           <span>Contacto del administrador: <b>{adminEmail}</b></span>
//         </Info>
//         <Btn onClick={handleBack}>Entendido, volver al login</Btn>
//       </Card>
//     </Container>
//   );
// }

// const Container = styled.div`
//   min-height: 100vh; display:flex; align-items:center; justify-content:center;
//   background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08));
// `;
// const Card = styled.div`
//   width: 100%; max-width: 520px; padding: 24px; border: 1px solid ${({ theme }) => theme.color2};
//   border-radius: 12px; backdrop-filter: blur(6px); box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//   color: ${({ theme }) => theme.text};
//   p{ opacity:.9; }
// `;
// const Header = styled.div`
//   display:flex; align-items:center; gap:10px; margin-bottom:6px;
// `;
// const Info = styled.div`
//   display:flex; align-items:center; gap:8px; margin: 12px 0 18px; opacity:.9;
// `;
// const Btn = styled.button`
//   width: 100%; padding: 10px 14px; border-radius: 10px;
//   background:#1CB0F6; color:#fff; border:2px solid rgba(255,255,255,.3);
// `;
