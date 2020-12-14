import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../Product/Product.jsx";
import data from "../../data/products.json";
import "./catalogue.css";
import usePagination from "../../hooks/usePagination";
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
  const [products, setProducts] = useState([]);
  const [currentCategory, SetCurrentCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const { current } = useSelector((state) => state);

  useEffect(() => {
    const categorias = Categories; //carga la primera vez que pongo la ruta
    setCategories(categorias);
    //setProducts(DataProduct);
  }, []);

  useEffect(() => {
    console.log("effect");
    if (currentCategory === "All") {
      setProducts(data);
    } else {
      const array = data.filter((e) => e.category === currentCategory); //corregir filtrado por value o selección
      setProducts(array);
    }
  }, [currentCategory]);

/*   const toMusicBar = () => {
    history.push("/musicbar");
  }; */

  return (
    <div className="box">
      <div className="container">
        {products
          .filter((song) => song.category.toLowerCase() === current || !current)
          .map((i) => {
            return (
              <div>
                <Product
                  image={i.image}
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
