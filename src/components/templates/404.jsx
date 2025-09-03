import styled, { keyframes } from "styled-components";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";

export function PageNot() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Card>
        <IconWrap>
          <Icon icon="solar:map-point-cross-bold-duotone" width={64} height={64} />
        </IconWrap>
        <Title>404 · Página no encontrada</Title>
        <Subtitle>
          La ruta <code>{pathname}</code> no existe o fue movida.
        </Subtitle>
        <Actions>
          <BtnPrimary onClick={() => navigate("/", { replace: true })}>Ir al inicio</BtnPrimary>
          <BtnGhost onClick={() => navigate(-1)}>Volver</BtnGhost>
        </Actions>
      </Card>
      <Art>
        <Float>
          <Icon icon="solar:compass-bold-duotone" width={220} height={220} />
        </Float>
        <Shadow />
      </Art>
    </Wrapper>
  );
}

const floaty = keyframes`
  0% { transform: translateY(0) }
  100% { transform: translateY(12px) }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  gap: 24px;
  padding: 24px;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.bg2} 0%, ${theme.bg} 100%)`};
  color: ${({ theme }) => theme.text};

  @media (min-width: 900px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 640px;
  border: 1px solid ${({ theme }) => theme.color2};
  background: ${({ theme }) => theme.bg3};
  border-radius: 14px;
  padding: 28px;
  box-shadow: ${({ theme }) => theme.boxshadow};
`;

const IconWrap = styled.div`
  display: inline-flex; align-items: center; justify-content: center;
  width: 56px; height: 56px; border-radius: 12px;
  background: ${({ theme }) => theme.bg6};
  color: ${({ theme }) => theme.color1};
`;

const Title = styled.h1`
  margin: 14px 0 6px; font-weight: 800; font-size: clamp(24px, 4vw, 36px);
`;

const Subtitle = styled.p`
  opacity: .9;
  code { background: ${({ theme }) => theme.bg4}; padding: 2px 6px; border-radius: 6px; }
`;

const Actions = styled.div`
  display:flex; gap:12px; margin-top: 16px; flex-wrap: wrap;
`;

const BtnPrimary = styled.button`
  padding: 10px 14px; border-radius: 10px; border: 2px solid rgba(255,255,255,.08);
  background: ${({ theme }) => theme.color1}; color: #fff; font-weight: 700;
`;

const BtnGhost = styled.button`
  padding: 10px 14px; border-radius: 10px; border: 1px solid ${({ theme }) => theme.color2};
  background: transparent; color: ${({ theme }) => theme.text};
`;

const Art = styled.div`
  display:flex; align-items:center; justify-content:center; flex-direction: column;
  opacity:.95;
`;

const Float = styled.div`
  animation: ${floaty} 1.8s ease-in-out infinite alternate;
  color: ${({ theme }) => theme.color1};
`;

const Shadow = styled.div`
  width: 140px; height: 26px; margin-top: 6px; border-radius: 50%;
  background: ${({ theme }) => theme.bgAlpha};
  filter: blur(10px);
`;
