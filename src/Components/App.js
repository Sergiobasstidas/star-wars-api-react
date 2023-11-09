import "../Scss/index.scss";
import SWList from "./StarWarsList";
import TarjetaDetalle from "./InfoCard";
import BreadCrumbs from "./BreadCrumbs";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  const [character, setCharacter] = useState(null);

  return (
    <Router>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div>
        <div className="text-center">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
            alt="star-wars-logo"
          />
        </div>
        <BreadCrumbs />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/personajes"
            element={<SWList type="personajes" setId={setCharacter} />}
          />
          <Route
            path="/planetas"
            element={<SWList type="planetas" setId={setCharacter} />}
          />
          <Route
            path="/naves"
            element={<SWList type="naves" setId={setCharacter} />}
          />
          <Route
            path="/personajes/:nombre"
            element={<TarjetaDetalle type="personajes" setId={setCharacter} />}
          />
          <Route
            path="/planetas/:nombre"
            element={<TarjetaDetalle type="planetas" setId={setCharacter} />}
          />
          <Route
            path="/naves/:nombre"
            element={<TarjetaDetalle type="naves" setId={setCharacter} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const Landing = () => {
  return (
    <div className="center-container">
      <div className="img-wrapper">
        <Link to="/personajes">
          <img
            className="img"
            src="https://i.pinimg.com/736x/18/13/bb/1813bb07eb46ad79e1bccbd809a3a49d.jpg"
            alt="Personajes"
          />
          <div className="hover">
            <div className="text text-personajes">PERSONAJES</div>
          </div>
        </Link>
      </div>
      <div className="img-wrapper">
        <Link to="/planetas">
          <img
            className="img "
            src="https://cdn.pixabay.com/photo/2023/01/17/05/33/star-wars-7723785_1280.jpg"
            alt="Planetas"
          />
          <div className="hover">
            <div className="text text-planetas">PLANETAS</div>
          </div>
        </Link>
      </div>
      <div className="img-wrapper">
        <Link to="/naves">
          <img
            className="img"
            src="https://images.alphacoders.com/173/173621.jpg"
            alt="naves"
          />
          <div className="hover">
            <div className="text text-naves">NAVES</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default App;
