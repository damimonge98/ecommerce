import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Product from "../Product/Product.jsx";
import data from "../../data/products.json";
import "./catalogue.css";
import usePagination from "../../hooks/usePagination";
import { getProducts } from "../../redux/actions/productActions";
const Categories = [
  "All",
  "Pop",
  "Rock",
  "Salsa",
  "Rap",
  "Cumbia",
  "Trap",
  "Reggaeton",
];

// aca se van a renderizar todas las card de product

const Cataloge = () => {
  const [productos, setProductos] = useState([]);
  const [currentCategory, SetCurrentCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const { current } = useSelector((state) => state);
  const products = useSelector((state) => state.products.productos); //traigo los datos del array "productos" que está adentro de un array "products"

  useEffect(() => {
    const categorias = Categories; //carga la primera vez que pongo la ruta
    setCategories(categorias);
    //setProducts(DataProduct);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const cargarProductos = () => dispatch(getProducts());
    cargarProductos();
    /*     console.log('accion:', getProduct()) */
  }, []);



/*   filtrado por categorías, está en pause por ahora
    useEffect(() => {
    console.log("effect");
    if (currentCategory === "All") {
      setProducts(data);
    } else {
      const array = data.filter((e) => e.category === currentCategory); //corregir filtrado por value o selección
      setProducts(array);
    }
  }, [currentCategory]); */

  return (
    <div className="box">
      <div className="container">
        {Array.isArray(products) && products
          /* .filter((song) => song.category.toLowerCase() === current || !current) */
          .map((i) => {
            return (
              <div>
                <Product
                  image={i.img}
                  name={i.name}
                  price={i.price}
                  description={i.description}
                  id={i.id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Cataloge;
