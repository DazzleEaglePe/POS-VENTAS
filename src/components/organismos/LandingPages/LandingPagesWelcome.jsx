import { useEffect } from "react";
import styled from "styled-components";
import { CardFuncion } from "./CardFuncion";
import { Device } from "../../../styles/breakpoints";
import ScrollReveal from "scrollreveal";
import { BtnLink } from "../../moleculas/BtnLink";
export const LandingPagesWelcome = () => {
  useEffect(() => {
    ScrollReveal().reveal(".left-section", {
      origin: "left",
      distance: "100px",
      duration: 1000,
      easing: "ease-in-out",
    });

    ScrollReveal().reveal(".right-section", {
      origin: "right",
      distance: "100px",
      duration: 1000,
      easing: "ease-in-out",
    });
    ScrollReveal().reveal(".footer-section", {
      origin: "bottom",
      distance: "100px",
      duration: 1000,
      easing: "ease-in-out",
      delay: 200,
    });
  }, []);

  return (
    <Container>
      <ContentSection>
        <SubContentSection>
          <LeftSection className="left-section">
            <Headline>
              <span>GESTIONA TUS VENTAS</span>
            </Headline>
            <Step>
              <IconPlaceholder>
                <img src="https://i.ibb.co/h19LCXP/aprendiendo.png" />
              </IconPlaceholder>
              <Text>
                <Title>Gestiona tu minimarket de manera eficiente</Title>
                <Description>
                  Optimiza tus operaciones y ventas en un sistema todo en uno.
                </Description>
              </Text>
            </Step>
            <Step>
              <IconPlaceholder>
                <img src="https://i.ibb.co/RBXt8Fs/taladro-de-mano.png" />
              </IconPlaceholder>
              <Text>
                <Title>Controla tu inventario y ventas de manera fácil</Title>
                <Description>
                  Administra el inventario y mantén un control total de las ventas.
                </Description>
              </Text>
            </Step>
            <Step>
              <IconPlaceholder>
                <img src="https://i.ibb.co/QPFxqC3/ejecutante.png" />
              </IconPlaceholder>
              <Text>
                <Title>Sistema de ventas simplificado</Title>
                <Description>
                  Mejora la experiencia de compra y aumenta la satisfacción del cliente.
                </Description>
              </Text>
            </Step>
            
            <CTAGroup>
              <BtnLink url={"/pos"} color={"#fff"} bgcolor={"#ff6a00"} titulo={"Comenzar a vender"} />
              <BtnLink url={"/"} color={"#2f2f2f"} bgcolor={"#ffffff"} titulo={"Saber más"} />
            </CTAGroup>
          </LeftSection>
          <RightSection className="right-section">
            <MockupImage>
              <CardFuncion
                top="10px"
                bgcontentimagen={"#fccdb8"}
                left={"-50px"}
                title={"Multi-empresa"}
                imagen={"https://i.ibb.co/HCF7jnx/escaparate.png"}
              />
              <CardFuncion
                top="110px"
                bgcontentimagen={"#e3d4cc"}
                left={"-20px"}
                title={"Multi-sucursal"}
                imagen={"https://i.ibb.co/MV6xZz4/franquicia.png"}
              />
              <CardFuncion
                top="210px"
                bgcontentimagen={"#aee0fd"}
                left={"-50px"}
                title={"Multi-caja"}
                imagen={
                  "https://i.ibb.co/3dZfQzF/caja-registradora.png"
                }
              />
              <CardFuncion
                top="310px"
                bgcontentimagen={"#fdc2b7"}
                left={"-20px"}
                title={"Multi-almacen"}
                imagen={
                  "https://qkzybkelsdmoezaaypou.supabase.co/storage/v1/object/public/imagenes/modulos/almacen.png"
                }
              />
               <CardFuncion
                top="410px"
                bgcontentimagen={"#52e0f9"}
                left={"-50px"}
                title={"Imprime directo"}
                subtitle={"sin cuadro de diálogo"}
                imagen={
                  "https://qkzybkelsdmoezaaypou.supabase.co/storage/v1/object/public/imagenes/modulos/impresora.png"
                }
              />
            </MockupImage>
          </RightSection>
        </SubContentSection>
      </ContentSection>

      <Footer className="footer-section">
        <FooterTitle>Gestiona tu negocio con estas capacidades</FooterTitle>
        <FooterGrid>
          <Col>
            <ColTitle>Ventas</ColTitle>
            <FeatureList>
              <li>Punto de venta rápido y seguro</li>
              <li>Métodos de pago múltiples</li>
              <li>Descuentos, notas y devoluciones</li>
              <li>Cierre y arqueo de caja</li>
            </FeatureList>
          </Col>
          <Col>
            <ColTitle>Inventario</ColTitle>
            <FeatureList>
              <li>Stock por almacén y sucursal</li>
              <li>Movimientos (entrada / salida)</li>
              <li>Alertas de bajo stock</li>
              <li>Catálogo por categorías</li>
            </FeatureList>
          </Col>
          <Col>
            <ColTitle>Gestión y reportes</ColTitle>
            <FeatureList>
              <li>Multi-empresa y multi-sucursal</li>
              <li>Serialización de comprobantes</li>
              <li>Impresión directa de tickets</li>
              <li>Dashboard y métricas de ventas</li>
            </FeatureList>
          </Col>
        </FooterGrid>
        <FinePrint>
          Construido con React, TanStack Query, Zustand y Styled Components. Backend: PostgreSQL + Supabase.
        </FinePrint>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
  @media ${Device.desktop} {
    height: calc(100vh - 40px);
  }
`;
const SubContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media ${Device.desktop} {
    flex-direction: row;
    justify-content: space-between;
    width: 70%;
  }
`;

const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  @media ${Device.desktop} {
    align-items: flex-start;
  }
`;

const Headline = styled.h1`
  text-align: center;
  font-size: 34px;
  margin: 0 0 8px 0;
  span {
    background: linear-gradient(90deg, #ff6a00 0%, #f39d0a 40%, #d5c215 60%, #f36edb 80%, #e02837 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-family: "Tilt Neon", sans-serif;
  }
  @media ${Device.desktop} {
    font-size: 40px;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  @media ${Device.desktop} {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`;

const IconPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 4px solid #f0f0f0;
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 800;
  margin: 0;

  @media ${Device.desktop} {
    font-size: 18px;
  }
`;

const Description = styled.p`
  font-size: 13px;
  margin: 5px 0 0;

  @media ${Device.desktop} {
    font-size: 14px;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  @media ${Device.desktop} {
    justify-content: flex-start;
  }
`;

const RightSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  border-left: none;
  margin-top: 20px;

  @media ${Device.desktop} {
    margin-top: 0;
  }
`;

const MockupImage = styled.div`
  width: 250px;
  height: 500px;
  background-color: #e0e0e0;
  border-radius: 20px;
  border: 6px solid #fff;
  position: relative;
  box-shadow: 0 12px 30px rgba(0,0,0,0.1);
  &::before {
    content: "";
    height: 360px;
    width: 360px;
    background-color: rgba(0, 51, 160, 0.1);
    position: absolute;
    z-index: -1;
    margin: auto;
    bottom: 20%;
    left: -60px;
    border-radius: 50%;
    animation: palpitar 3s infinite;
  }
  @keyframes palpitar {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  @media ${Device.desktop} {
    width: 250px;
    height: 500px;
  }
`;

const Footer = styled.div`
  background-color: #0033a0;
  color: white;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  padding: 18px 12px 20px 12px;
`;

const FooterTitle = styled.h4`
  font-size: 18px;
  margin: 4px 0 14px 0;
  @media ${Device.desktop} {
    font-size: 20px;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 980px;
  margin: 0 auto 10px auto;
  text-align: left;
  @media ${Device.desktop} {
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
`;

const Col = styled.div`
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 12px 14px;
`;

const ColTitle = styled.h5`
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 800;
`;

const FeatureList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
  li {
    font-size: 13px;
    line-height: 1.35;
    list-style: none;
    position: relative;
    padding-left: 12px;
  }
  li::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ffd166;
    position: absolute;
    left: 0;
    top: 8px;
  }
`;

const FinePrint = styled.p`
  margin: 10px 0 2px 0;
  font-size: 12px;
  opacity: 0.9;
`;
