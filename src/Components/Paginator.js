import React from "react";
import PropTypes from "prop-types";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="paginator">
      <button className="previous-link" onClick={handlePreviousPage}>
        Anterior
      </button>
      <span className="page-link">
        Página {currentPage} de {totalPages}
      </span>
      <button className="next-link" onClick={handleNextPage}>
        Siguiente
      </button>
    </div>
  );
};

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginator;
