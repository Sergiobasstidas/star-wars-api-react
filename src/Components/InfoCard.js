import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { imgURLs, getId } from "./StarWarsList";
import { selectData } from "../redux/starWarsState";
import { Link } from "react-router-dom";

const TarjetaDetalle = ({ type, setId }) => {
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.starWars.selectedData);
  const residentsDetails = useSelector((state) => state.starWars.residents);

  if (!selectedData) {
    return null;
  }

  const {
    name,
    image,
    birth_year,
    height,
    gender,
    mass,
    residents,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    terrain,
    surface_water,
    population,
  } = selectedData;

  function setInfo(item) {
    const newItem = {
      ...item,
      image: `${imgURLs["personajes"]}${getId(item.url)}.jpg`,
    };

    dispatch(selectData(newItem));

    setId(newItem);
  }

  return (
    <div className="">
      <div className="container-tarjeta">
        <div className="tarjeta-image">
          <img className="personaje-image" src={image} alt={name} />
        </div>
        <div className="info-text">
          <h1>{name}</h1>
          <span>
            <strong>Nombre: </strong>
            {name}
          </span>
          <span>
            <strong>Año de nacimiento: </strong>
            {birth_year}
          </span>
          <span>
            <strong>Altura: </strong>
            {height} in.
          </span>
          <span>
            <strong>Género: </strong>
            {gender}
          </span>
          <span>
            <strong>Peso: </strong>
            {mass} lbs.
          </span>

          {/* Propiedades específicas de planetas */}
          {diameter && (
            <span>
              <strong>Diametro: </strong>
              {diameter}
            </span>
          )}
          {climate && (
            <span>
              <strong>Clima: </strong>
              {climate}
            </span>
          )}
          {terrain && (
            <span>
              <strong>Tipo de terreno: </strong>
              {terrain}
            </span>
          )}
          {surface_water && (
            <span>
              <strong>Agua en la superficie: </strong>
              {surface_water}
            </span>
          )}
          {population && (
            <span>
              <strong>Población: </strong>
              {population}
            </span>
          )}

          {/* Propiedades específicas de naves */}
          {rotation_period && (
            <span>
              <strong>Periodo de rotación: </strong>
              {rotation_period}
            </span>
          )}
          {orbital_period && (
            <span>
              <strong>Periodo Orbital: </strong>
              {orbital_period}
            </span>
          )}
        </div>
      </div>

      <div>
        {type === "planetas" &&
          residentsDetails &&
          residentsDetails.length > 0 && (
            <div className="container-residentes ">
              <span className="titlo-residentes">Residentes:</span>
              <div className="flex">
                {residentsDetails.map((resident) => (
                  <div key={resident.name} className="resident">
                    <Link
                      to={`/personajes/${resident.name}`}
                      onClick={() => setInfo(resident)}
                    >
                      <img
                        className="img-sm"
                        src={`${imgURLs.personajes}${getId(resident.url)}.jpg`}
                        alt={resident.name}
                      />
                    </Link>
                    <p className="text-residentes">{resident.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default TarjetaDetalle;
