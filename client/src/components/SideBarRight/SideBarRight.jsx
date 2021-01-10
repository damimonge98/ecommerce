import React, { useEffect, useContext, useState } from "react";
import "./SideBarRight.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  clearCarrito,
  removeProduct,
  addProduct,
  removeAllProduct,
  loadGuestCart,
} from "../../redux/reducers/carritoReducer";
import ProductItem from "../ProductItem/ProductItem";
import { Context } from "../../App";
import { Link } from "react-router-dom";
import { loadState } from "../../redux/maintainState/saveLoad";
import { fetchCart } from "../../redux/reducers/carritoReducer";
import clienteAxios from "../../config/axios";
import { getUserOrderDetail } from "../../redux/actions/orderActions.js";

export default function SideBarRight() {
  const { setRightBarOpen, isRightBarOpen } = useContext(Context);
  const dispatch = useDispatch();
  const location = useLocation();
  const productos = useSelector((state) => state.carrito.products);
  const products = useSelector((state) => state.products.productos);
  const url = window.location.pathname;
  const productsUrl = `/products/${products.id}`;
  const catalogueUrl = "/";
  const shoppingCount = productos.reduce(
    (prev, curr) => (prev ?? 0) + curr.cantidad,
    0
  );
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (productos.length > 0 && location.pathname === "/") {
      setRightBarOpen(true);
    }
  }, [productos]);

  useEffect(() => {
    const moverLocalABack = async (state, userId) => {
      console.log("mover local a back");
      const result = await clienteAxios.get(`orders/users/${userId}/cart`);
      console.log("result1:", result);
      const data = result.data;
      //pasar productos de state.carrito.products al back
      for (const localProduct of state) {
        const productBack = data.find((x) => x.productId == localProduct.id);
        if (productBack) {
          const result = await clienteAxios.put(`orders/users/${userId}/cart`, {
            productId: localProduct.id,
            cantidad: productBack.cantidad + localProduct.cantidad,
          });
          console.log(result);
        } else {
          const result = await clienteAxios.post(`orders/users/${userId}/cart`, {
            productId: localProduct.id,
            cantidad: localProduct.cantidad,
          });
          console.log(result);
        }
      }
      dispatch(fetchCart(userData.userAUTH.id));
    };
    if (userData.isAuthenticated) {
      const state = JSON.parse(localStorage.getItem("carritoGuest"), "[]");
      if (state && state.length > 0) {
        moverLocalABack(state, userData.userAUTH.id);
        //console.log(state.carrito.products);
      }else{
        dispatch(fetchCart(userData.userAUTH.id));
      }
      
    } else {
      dispatch(loadGuestCart(0));
    }
  }, [userData]);

  return (
    <div
      className="sidebarright-container"
      style={{
        right: isRightBarOpen ? "0px" : "-400px",
        // Si está en products/:id no cambia el margin top
        marginTop: url === productsUrl ? "0px" : null,
        // Si está en el catálogo o en products/:id se ve, si no, está escondido
        visibility:
          url === productsUrl
            ? "visible"
            : url === catalogueUrl
            ? "visible"
            : "hidden",
      }}
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
                dispatch(clearCarrito());
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
          <Link
            to="/order/checkout"
            style={{ textDecoration: "none" }}
            className="cd-checkout-btn"
          >
            Go to checkout
          </Link>
          <Link
            to="/order"
            style={{ textDecoration: "none" }}
            className="cd-go-to-cart"
          >
            Go to cart page
          </Link>
        </div>
      </div>
    </div>
  );
}
