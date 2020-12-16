import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Product from "../Product/Product.jsx";
import data from "../../data/products.json";
import "./catalogue.css";
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

  //constantes para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(12);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

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
    <div>
      <div className="box">
        <div className="container">
          
          {currentProducts
            .filter(
              (song) => song.category.toLowerCase() === current || !current
            )
            .map((i) => {
              return (
                <div key={i.id}> 
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
            <div className="pag">
             <div className="pagnation">
              <Pagination
                productPerPage={productPerPage}
                totalproduct={products.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
                currentPage={currentPage}
              />
          </div>
          </div>
           
        </div>

       
      </div>
      
    </div>
  );
};
export default Cataloge;
