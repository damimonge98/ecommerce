import React from "react";
import "./product.css";
import { Link } from "react-router-dom";
import DataProduct from "../../data/products.json";


/* Función para filtrar los productos por id, luego conversamos si la dejo acá o si la cambiamos a otro módulo */

export const Product = ({ id, image, name, description, price, stock }) => {
  return (
    <div className="card">
      <Link to={`/products/${id}`}>
        <img src={image} className="card-img-top" alt={name} />
        <div className="div-h2">
          <h2 className="card-h2">
            {name}
            <br />
            {description}
          </h2>
        </div>
        <div className="div-button">
          <button className="button-card" type="button">
            Comprar
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Product;
