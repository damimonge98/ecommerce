import React from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/reducers/carritoReducer";
import { addToast } from "../../redux/reducers/toastReducer";

export const Product = ({ id, image, name, description, price, stock }) => {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <Link to={`/products/${id}`}>
        <img src={image} className="card-img-top" alt={name} />
      </Link>
      <div className="div-h2">
        <h2 className="card-h2">
          {name}
          <br />
          {description}
        </h2>
      </div>
      <div className="div-button">
        <button
          className="button-card"
          type="button"
          onClick={() => {
            dispatch(
              addProduct({ id, image, name, description, price, stock })
            );
            dispatch(
              addToast({
                type: "success",
                content: "Producto agregado!!!",
              })
            );
          }}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Product;
