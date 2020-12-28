import React, { useEffect, useContext } from "react";
import "./SideBarRight.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import {
  clearAll,
  removeProduct,
  addProduct,
  removeAllProduct,
} from "../../redux/reducers/carritoReducer";
import ProductItem from "../ProductItem/ProductItem";
import { Context } from "../../App";
import { Link } from "react-router-dom";

export default function SideBarRight() {
  const { setRightBarOpen, isRightBarOpen } = useContext(Context);
  const dispatch = useDispatch();
  const location = useLocation();
  const productos = useSelector((state) => state.carrito.products);
  const products = useSelector((state) => state.products.productos);
  const shoppingCount = productos.reduce(
    (prev, curr) => (prev ?? 0) + curr.cantidad,
    0
  );

  useEffect(() => {
    if (productos.length > 0 && location.pathname === '/' ) {
      setRightBarOpen(true);
    }
  }, [productos]);
  return (
    <div
      className="sidebarright-container"
      style={{ right: isRightBarOpen ? "0px" : "-400px" }}
      id="cd-shadow-layer"
    >
      <div id="cd-cart">
        <div className="cd-btn">
          <button
            type="button"
            onClick={() => setRightBarOpen(false)}
            className="btn-close btn-close-white"
            aria-label="Close"
            id="close-btn"
          ></button>
        </div>
        <div className="cd-titles">
          <h2 className="cd-title">
            Cart ({shoppingCount})
            <p
              className="cd-empty"
              onClick={() => {
                dispatch(clearAll());
              }}
            >
              <a href="#0"> Empty </a>
              <i class="fas fa-trash-alt"></i>
            </p>
          </h2>
        </div>
        <ul class="cd-cart-items">
          {productos.map((producto) => (
            <li>
              <a href="#0" class="cd-item-remove cd-img-replace">
                <i
                  class="fa fa-times"
                  onClick={() => {
                    dispatch(removeAllProduct({ id: producto.id }));
                  }}
                ></i>
              </a>
              <ProductItem
                key={producto.id}
                product={producto}
                onIncreaseCant={() => {
                  dispatch(addProduct({ id: producto.id }));
                }}
                onDecreaseCant={() => {
                  dispatch(removeProduct({ id: producto.id }));
                }}
              />
            </li>
          ))}
        </ul>
        <div className="cd-bottom-div">
          <div class="cd-cart-total">
            <p>
              {`Total: ${productos.reduce(
                (acc, item) => acc + item.price * item.cantidad,
                0
              )}$`}
            </p>
          </div>
          <Link to = '/order/checkout'>
          <button className="cd-checkout-btn">
            <a href="#0">Go to checkout</a>
          </button>
          </Link>
            <Link role="button" to="/order" style={{textDecoration:'none'}} className="cd-go-to-cart">Go to cart page</Link>
        </div>
      </div>
    </div>
  );
}
