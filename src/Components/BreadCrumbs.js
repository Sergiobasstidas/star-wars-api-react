import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter((segment) => segment);

  return (
    <nav>
      <ul>
        <Link className="sin-estilos page-link" to="/">
          H o m e
        </Link>
        {segments.map((segment, index) => (
          <span key={segment}>
            <span className="sin-estilos page-link"> / </span>
            <Link className="sin-estilos page-link" to={`/${segment}`}>
              {segment.includes("%20")
                ? segment.replace("%20", " ")
                : segment.charAt(0).toUpperCase() +
                  segment.slice(1).toLowerCase()}
            </Link>
          </span>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
