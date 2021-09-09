import React from "react";
import { primerMayuscula } from "../helper";
import styled from "@emotion/styled";

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;

const Resumen = ({ datos }) => {
  const { marca, ano, plan } = datos;

  if (marca === "" || ano === "" || plan === "") return null;

  return (
    <ContenedorResumen>
      <h2>Resumen de Cotizacion</h2>
      <ul>
        <li>Marca: {primerMayuscula(marca)}</li>
        <li>Plan: {primerMayuscula(plan)}</li>
        <li>Año del Auto: {primerMayuscula(ano)}</li>
      </ul>
    </ContenedorResumen>
  );
};

export default Resumen;
