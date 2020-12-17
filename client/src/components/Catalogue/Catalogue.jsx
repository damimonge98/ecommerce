import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Product from "../Product/Product.jsx";
import "./catalogue.css";
import {getProducts} from '../../redux/actions/productActions'
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
  //traigo los datos del array "productos" del estado inicial, que está adentro de un array "products"
  const products = useSelector((state) => state.products.productos); 
  console.log(products.data)
  //constantes para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(12);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  // le paso Array.isArray para que reconozca que products es un array, (va a devolver un booleano) sin esto, no lo reconoce por el delay entre la conexión del servidor y el catálogo
  console.log(products.data)
  if(!products.data){ 
  var currentProducts = Array.isArray(products) && products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );}
  else{
    currentProducts= products.data
  }
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

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
/* console.log(currentProducts) */

  return (
    <div>
      <div className="box">
        <div className="container">
          
          {!currentProducts ? (<p>Espera</p>): currentProducts
           /*  .filter(
              (song) => song.category.toLowerCase() === current || !current
            ) */
            .map((i) => {
              return (
                <div key={i.id}> 
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

/*   filtrado por categorías, está en pause por ahora
    useEffect(() => {
    console.log("effect");
    if (currentCategory === "All") {
      setProducts(data);
    } else {
      const array = data.filter((e) => e.category === currentCategory); //corregir filtrado por value o selección
      setProducts(array);
    }
  }, [currentCategory]);*/