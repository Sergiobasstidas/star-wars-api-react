import axios from "axios";
import PropTypes from "prop-types";
import Paginator from "./Paginator";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { selectData, selectResidents } from "../redux/starWarsState";

const SWList = ({ type, setId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(selectData(null));
    dispatch(selectResidents([]));
    setIsLoading(true);

    const endpoint =
      type === "personajes"
        ? "people"
        : type === "planetas"
        ? "planets"
        : "starships";
    axios
      .get(`https://swapi.dev/api/${endpoint}/?page=${currentPage}`)
      .then((response) => {
        setData(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  }, [currentPage, type]);

  function setInfo(item) {
    item.image = `${imgURLs[type]}${getId(item.url)}.jpg`;
    dispatch(selectData(item));
    setId(item);

    if (type === "planetas" && item.residents && item.residents.length > 0) {
      Promise.all(item.residents.map((residentURL) => axios.get(residentURL)))
        .then((responses) => {
          const residentsDetails = responses.map((response) => response.data);

          dispatch(selectResidents(residentsDetails));
        })
        .catch((error) => {
          console.error("Error al obtener detalles de residentes:", error);
        });
    }
  }

  return (
    <div>
      {isLoading ? (
        <p className="paginator">Cargando datos...</p>
      ) : (
        <div>
          <Paginator
            currentPage={currentPage}
            totalPages={Math.ceil(87 / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
          <ul className="flex">
            {data.map((item) => (
              <li className="img-wrapper" key={item.name}>
                <Link
                  to={`/${type}/${item.name}`}
                  onClick={() => setInfo(item)}
                >
                  <img
                    className="img"
                    src={`${imgURLs[type]}${getId(item.url)}.jpg`}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://media.licdn.com/dms/image/C5612AQGN00aSnczzRg/article-inline_image-shrink_1500_2232/0/1520203381486?e=1704931200&v=beta&t=SjW2ulkKgKfnrvCDKnSu-HwcoWJjBVUfoXP0zNTmIRk"; //
                    }}
                  />
                  <div
                    className="hover"
                    style={{ color: "var(--golden-starwars)" }}
                  >
                    <h3 className="gold-text">{item.name}</h3>
                    {type === "planetas" && (
                      <>
                        <p className="gold-text">Diametro: {item.diameter}</p>
                        <p className="gold-text">
                          Tipo de terreno: {item.terrain}
                        </p>
                        <p className="gold-text">
                          Tipo de Clima: {item.climate}
                        </p>
                      </>
                    )}
                    {type === "personajes" && (
                      <div className="text">{item.name}</div>
                    )}
                    {type === "naves" && (
                      <>
                        <p className="gold-text">Modelo: {item.model}</p>
                        <p className="gold-text">
                          Capacidad: {item.passengers}
                        </p>
                        <p className="gold-text">
                          Capacidad: {item.cargo_capacity}
                        </p>
                        <p className="gold-text">
                          Starship Class: {item.starship_class}
                        </p>
                      </>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SWList.propTypes = {
  type: PropTypes.oneOf(["personajes", "planetas", "naves"]).isRequired,
  setId: PropTypes.func.isRequired,
};

const imgURLs = {
  personajes: "https://starwars-visualguide.com/assets/img/characters/",
  planetas: "https://starwars-visualguide.com/assets/img/planets/",
  naves: "https://starwars-visualguide.com/assets/img/starships/",
};
function getId(url) {
  if (typeof url === "string") {
    return url.split("/")[url.split("/").length - 2];
  } else if (typeof url === "object" && url.hasOwnProperty("name")) {
    return url.name;
  } else {
    return "";
  }
}
export { imgURLs, getId };

export default SWList;
