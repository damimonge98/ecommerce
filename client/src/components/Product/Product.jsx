import React from "react";
import "./product.css";
import { Link } from "react-router-dom";
import DataProduct from "../../data/products.json";

/* Función para filtrar los productos por id, luego conversamos si la dejo acá o si la cambiamos a otro módulo */

export function filterId(id) {
  let product = DataProduct.filter((p) => p.id === parseInt(id));
  if (product.length > 0) {
    return product[0];
  } else {
    return "No existe este id";
  }
}

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

/* 
Array de prueba, lo pueden utilizar para probar sus funciones
--------------------------------------------------------
    const DataProduct = [
    {
        id: 1,
        img: "https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
        title: "GOTEO",
        price: "1",
        description: "Duki-super sangre joven",
        stock: "Infinito"
    },
    {
        id: 2,
        img: "https://i.pinimg.com/736x/4e/0b/dd/4e0bddbf2f1664e14cc8d25b63db2044.jpg",
        title: "SOLO",
        price: "1",
        description: "Marshmello-ZONA69.",
        stock: "Infinito"
    },
    {
        id: 3,
        img: "https://www.cmtv.com.ar/tapas-cd/rombainochelocasingle.jpg",
        title: "NOCHE LOCA",
        price: "1",
        description: "Marama-de fiesta.",
        stock: "Infinito"
    }
]

          Map de prueba para renderizar el componente Products
          ---------------------------------------------------- 
          {DataProduct.map((i, v) => {
                    return ( 
                        <div>{`The value of the id is ${i.id}`}</div>
                        )
                    })}  
*/

export default Product;
