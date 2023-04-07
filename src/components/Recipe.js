import React from "react";
import { Link } from "react-router-dom";

export default function Recipe({ image, name, id, area, category }) {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{category}</h4>
        <p>{area}</p>
        <Link to={`/recipe/${id}`} className="btn btn-primary btn-details">
          details
        </Link>
      </div>
    </article>
  );
}
