import React, {useState,useEffect} from "react";
import "./SideBarRight.css";
import "../Sidenavbar/Sidebar.css";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../redux/categories";
import { clearAll, removeProduct, addProduct } from "../../redux/reducers/carritoReducer";
import Button from "react-bootstrap/esm/Button";
import ProductItem from '../ProductItem/ProductItem'

export default function SideBarRight(props) {
  const [isRightBarOpen, setRightBarOpen]= useState(false)
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.carrito.products);

  useEffect( ()=>{
    if(productos.length > 0){
      setRightBarOpen(true)
    }
  }, [productos])
  return (
    <div>
      <div className="sidebarright-container" style={{right:isRightBarOpen? '0px':'-220px'}}>
        <div className="sidebarright-options">
          <button onClick={() => setRightBarOpen(false)}>x</button>
          <button onClick={() => setRightBarOpen(true)}>y</button>
        </div>
        <div className="sidebarright-products">
        {productos.map((producto) => 
          <ProductItem  key={producto.id} product={producto} onIncreaseCant={() => {
            dispatch(addProduct({ id: producto.id }));
          }} onDecreaseCant={() => {
            dispatch(removeProduct({ id: producto.id }));
          }}/>)}
        <div>
          {`Tienes ${productos.length} en el carrito. ${productos.reduce(
            (prev, curr) => (prev ?? 0) + curr.cantidad,
            0
          )}`}
          {`El precio total es: ${productos.reduce((acc,item)=>acc+item.price*item.cantidad,0)}`}
        </div>
        <Button
          onClick={() => {
            dispatch(clearAll());
          }}
        >
          Borrar todo
        </Button>
        </div>
      </div>
    </div>
  );
}
