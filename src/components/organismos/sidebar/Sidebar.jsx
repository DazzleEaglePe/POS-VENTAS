import styled from "styled-components";
import {
  LinksArray,
  SecondarylinksArray,
  ToggleTema,
  useAuthStore,
  confirmLogout,
  toastSuccess,
} from "../../../index";
import { v } from "../../../styles/variables";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";


export function Sidebar({ state, setState }) {
  const {cerrarSesion} = useAuthStore()
  const queryClient = useQueryClient()
  const salir = async () => {
    const ok = await confirmLogout()
    if (!ok) return
    await cerrarSesion()
    queryClient.clear()
    toastSuccess('Sesión cerrada')
  }
  return (
    <Main $isopen={state.toString()}>
      <span className="Sidebarbutton" onClick={() => setState(!state)}>
        {<v.iconoflechaderecha />}
      </span>
      <Container $isopen={state.toString()} className={state ? "active" : ""}>
        <div className="Logocontent">
          <div className="imgcontent">
            <img src={v.logo} />
          </div>
          <h2>Minimarket</h2>
        </div>
        {LinksArray.map(({ icon, label, to, color }) => (
          <div
            className={state ? "LinkContainer active" : "LinkContainer"}
            key={label}
            title={!state ? label : undefined}
          >
            <NavLink
              to={to}
              className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
            >
              <section className={state ? "content open" : "content"}>
                <Icon style={{color}} className="Linkicon" icon={icon} />
                <span className={state ? "label_ver" : "label_oculto"}>
                  {label}
                </span>
              </section>
            </NavLink>
          </div>
        ))}
        <Divider />
        {SecondarylinksArray.map(({ icon, label, to, color }) => (
          <div
            className={state ? "LinkContainer active" : "LinkContainer"}
            key={label}
            title={!state ? label : undefined}
          >
            <NavLink
              to={to}
              className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
            >
              <section className={state ? "content open" : "content"}>
                <Icon color={color} className="Linkicon" icon={icon} />
                <span className={state ? "label_ver" : "label_oculto"}>
                  {label}
                </span>
              </section>
            </NavLink>
          </div>
        ))}
        <div className={state ? "LinkContainer active" : "LinkContainer"} title={!state ? 'Salir' : undefined}>
          <div className="Links" onClick={salir} >
            <section className={state ? "content open" : "content"}>
              <Icon
                color="#ef4444"
                className="Linkicon"
                icon="solar:logout-2-bold-duotone"
              />
              <span  className={state ? "label_ver" : "label_oculto"}>SALIR</span>
            </section>
          </div>
         
         
        </div>

        <ToggleTema />
      </Container>
    </Main>
  );
}
const Container = styled.div`
  background: ${({ theme }) => theme.bgtotal};
  color: ${(props) => props.theme.text};
  position: fixed;
  padding-top: 20px;
  z-index: 2;
  height: 100%;
  width: 88px;
  transition: 0.1s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid ${({ theme }) => theme.color2};
  
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colorScroll};
    border-radius: 10px;
  }

  &.active {
    width: 260px;
  }
  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 60px;
    .imgcontent {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      cursor: pointer;
      transition: 0.3s ease;
      transform: ${({ $isopen }) =>
          $isopen === "true" ? `scale(0.7)` : `scale(1.5)`}
        rotate(${({ theme }) => theme.logorotate});
      img {
        width: 100%;
        animation: flotar 1.7s ease-in-out infinite alternate;
      }
    }
    h2 {
      color: #f88533;
      display: ${({ $isopen }) => ($isopen === "true" ? `block` : `none`)};
    }
  }
  .LinkContainer {
    margin: 9px 0;
    margin-right:10px;
    margin-left:8px;
    transition: all 0.2s ease-in-out;
    position: relative;
    text-transform: uppercase;
    font-weight: 700;
  }

  .Links {
    border-radius: 14px;
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%;
    color: ${(props) => props.theme.text};
    height: 60px;
    position: relative;
    border: 1px solid ${(props) => props.theme.bg4};
    background: ${(props) => props.theme.bgAlpha};
    backdrop-filter: blur(4px);
    .content {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
      .Linkicon {
        display: flex;
        font-size: 33px;
        filter:grayscale(100%);
        svg {
          font-size: 25px;
        }
      }

      .label_ver {
        transition: 0.2s ease-in-out;
        opacity: 1;
        display: initial;
        cursor: pointer;
      }
      .label_oculto {
        opacity: 0;
        display: none;
      }

      &.open {
        justify-content: start;
        gap: 18px;
        padding: 18px 20px;
      }
    }

    &:hover {
      box-shadow: 0 0 0 3px ${(props) => props.theme.bg5} inset;
    }

    &.active {
      background: ${(props) => props.theme.bg6};
      border: 2px solid ${(props) => props.theme.bg5};
      color: ${(props) => props.theme.color1};
      font-weight: 700;
      .Linkicon{
        filter: grayscale(0%);
      }
    }
  }
`;
const Main = styled.div`
  .Sidebarbutton {
    position: fixed;
    top: 70px;
    left: 68px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3},
      0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 3;
    transform: ${({ $isopen }) =>
      $isopen === "true" ? `translateX(173px) rotate(3.142rad)` : `initial`};
    color: ${(props) => props.theme.text};
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;