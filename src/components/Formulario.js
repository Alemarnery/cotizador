import React, { useState } from "react";
import styled from "@emotion/styled";
import { calcularMarca, obtenerDiferenciaYear, obtenerPlan } from "../helper";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  s &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen }) => {
  const [datos, guardarDatos] = useState({
    marca: "",
    ano: "",
    plan: "",
  });

  const [error, setError] = useState(false);

  //extraer los valores del state
  const { marca, ano, plan } = datos;

  const saveData = (e) => {
    guardarDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const cotizarSeguro = (e) => {
    e.preventDefault();
    if (marca.trim() === "" || ano.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    let resultado = 2000;

    const diferencia = obtenerDiferenciaYear(ano);
    resultado -= (diferencia * 3 * resultado) / 100;

    resultado = calcularMarca(marca) * resultado;
    const incrementoPlan = obtenerPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
    guardarResumen({
      cotizacion: resultado,
      datos,
    });
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>todos los campos son obligatorios</Error> : null}

      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={saveData}>
          <option value="">--Seleccione--</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Ano</Label>
        <Select name="ano" value={ano} onChange={saveData}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={saveData}
        />
        Basico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={saveData}
        />
        Completo
      </Campo>

      <Button type="submit">Cotizar</Button>
    </form>
  );
};

export default Formulario;
