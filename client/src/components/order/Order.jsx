import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "./OrderDetail/orderDetail";
import {
  removeProduct,
  addProduct,
  removeAllProduct,
} from "../../redux/reducers/carritoReducer";

import "./Order.css";
const Order = () => {
  const productos = useSelector((state) => state.carrito.products);
  const dispatch = useDispatch();

  const addProductAction = (id) =>{
    console.log('add product')
    dispatch(addProduct({ id}));
  }

  const removeProductAction = (id) =>{
    console.log('remove product')
    dispatch(removeProduct({ id }));
  }
  const deleteProduct = (id) =>{
    console.log('remove product')
    dispatch(removeAllProduct({ id}));
  }
  return (
    <div className="box">
      <div className="container">
        <div className="order">
          {productos.map((product) => {
            return <OrderDetail key={product.id} product={product} deleteProduct={() => deleteProduct(product.id)}removeProduct={() =>removeProductAction(product.id)} addProduct={()=> addProductAction(product.id)} />;
          })}
        </div>
        <div>
          total: {productos.reduce(
                (acc, item) => acc + item.price * item.cantidad,
                0
              )}
        </div>
        <div>
          <button>Finalizar compra</button>
          <button>Continuar compra</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
