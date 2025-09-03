import styled from "styled-components";
import { AccionTabla } from "../../../index";
import { Icon } from "@iconify/react";
export function ContentAccionesTabla({ funcionEditar, funcionEliminar, funcionVer }) {
  return (
    <Container>
      {funcionVer && (
        <AccionTabla
          funcion={funcionVer}
          fontSize="20px"
          color="#0ea5e9"
          icono={<Icon icon="solar:eye-bold-duotone" />}
        />
      )}
      {funcionEditar && (
        <AccionTabla
          funcion={funcionEditar}
          fontSize="20px"
          color="#22c55e"
          icono={<Icon icon="solar:pen-2-bold-duotone" />}
        />
      )}
      {funcionEliminar && (
        <AccionTabla
          funcion={funcionEliminar}
          fontSize="20px"
          color="#ef4444"
          icono={<Icon icon="solar:trash-bin-minimalistic-bold-duotone" />}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  @media (max-width: 48em) {
    justify-content: end;
  }
  span { transition: transform .12s ease; }
  span:hover { transform: scale(1.08); }
`;
