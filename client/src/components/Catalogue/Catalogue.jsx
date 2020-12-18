import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Product from "../Product/Product.jsx";
import "./catalogue.css";
import { getProducts } from "../../redux/actions/productActions";
import { getCategories } from "../../redux/actions/categoryActions";
import { Context } from "../../App";
import spinner from "../Spinner";
// aca se van a renderizar todas las card de product

const Cataloge = () => {
  const { currentCategory } = useContext(Context);
  const [productos, setProductos] = useState([]);
  /* const [currentCategory, setCurrentCategory] = useState("All"); */
  const [categorias, setCategorias] = useState([]);
  const history = useHistory();
  const { current } = useSelector((state) => state);
  //traigo los datos del array "productos" del estado inicial, que está adentro de un array "products"
  const products = useSelector((state) => state.products.productos);
  const categories = useSelector((state) => state.categories.categorias);
  //constantes para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(12);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  if (!products.data) {
    var currentProducts =
      // le paso Array.isArray para que reconozca que products es un array, (va a devolver un booleano) sin esto, no lo reconoce por el delay entre la conexión del servidor y el catálogo
      Array.isArray(productos) &&
      productos.slice(indexOfFirstProduct, indexOfLastProduct);
  } else {
    currentProducts = products.data;
  }

  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    //si no hay productos, aparece el spinner
    if (!products) return spinner();
    //cuando entra en / la categoría es 'All', está seteada así en Sidebar, y renderiza todos los productos
    (async () => {
    if (currentCategory === "All") await setProductos(products);
    })();
  });

  useEffect(() => {
    if (!products) return spinner();
    (async () => {
      //una vez la categoría cambia de All a cualquier otro nombre, va a insertar en un nuevo array el producto que tenga esa categoría asociada
      if (currentCategory !== "All") {
        const array = [];
        Array.isArray(products) && products.forEach((producto) =>
          producto.categories.forEach((categoria) => {
            if (categoria.name == currentCategory) {
              array.push(producto);
            }
          })
        );
        await setProductos(array);
        console.log("array filtrado:", array);
      }
    })();
  }, [currentCategory]);

  const dispatch = useDispatch();

  useEffect(() => {
    const cargarProductos = () => dispatch(getProducts());
    setProductos(cargarProductos());
  }, []);

  useEffect(() => {
    const cargarCategorias = () => dispatch(getCategories());
    cargarCategorias();
  }, []);

  return (
    <div>
      <div className="box">
        <div className="container">
          {!currentProducts
            ? spinner()
            : currentProducts.map((i) => {
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

/* export const accessGlobalState = () => wrapState(globalState)
export const useGlobalState = () => wrapState(useState(globalState)) */
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
