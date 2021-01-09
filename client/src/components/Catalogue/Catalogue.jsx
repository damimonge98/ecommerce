import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Product from "../Product/Product.jsx";
import "./catalogue.css";
import { getProducts } from "../../redux/actions/productActions";
import { Context } from "../../App";
import spinner from "../Spinner";
import Carousel from '../Carousel/Carousel';
import { getAllReviews } from "../../redux/actions/reviewActions";
// aca se van a renderizar todas las card de product

const Cataloge = () => {
  const { currentCategory } = useContext(Context);
  const [productos, setProductos] = useState([]);
  //traigo los datos del array "productos" del estado inicial, que está adentro de un array "products"
  const products = useSelector((state) => state.products.productos);
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
        const filterProducts = [];
        Array.isArray(products) &&
          products.forEach((producto) =>
            producto.categories.forEach((categoria) => {
              if (categoria.name == currentCategory) {
                filterProducts.push(producto);
              }
            })
          );
        await setProductos(filterProducts);
      }
    })();
  }, [currentCategory]);

  const dispatch = useDispatch();

  useEffect(() => {
    const cargarProductos = () => dispatch(getProducts());
    setProductos(cargarProductos());
  }, []);

  useEffect(() => {
    const getReviews = () => dispatch(getAllReviews());
    getReviews();
  },[])

  return (
    <div>
      <div className="box">
        <div className="containerCatalogue">
          {!currentProducts
            ? spinner()
            : currentProducts.map((i) => {
                //validamos el stock. En caso que este agotado, le agregamos una propiedad
                //para utilizarlo despues
                if (i.stock === 0) {
                  return (
                    <div key={i.id}>
                      <Product
                        image={i.img}
                        name={i.name}
                        price={i.price}
                        description={i.description}
                        id={i.id}
                        sold_out={true}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={i.id}>
                      <Product
                        image={i.img}
                        name={i.name}
                        price={i.price}
                        description={i.description}
                        id={i.id}
                        sold_out={false}
                      />
                    </div>
                  );
                }
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
