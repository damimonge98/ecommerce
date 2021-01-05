import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Product_Card.css";
import { useHistory, useParams } from "react-router-dom";
/* import MusicBar from "../../components/MusicBar/MusicBar"; */
import { addProduct } from "../../redux/reducers/carritoReducer";
import { addToast } from "../../redux/reducers/toastReducer";
import { getProductId } from "../../redux/actions/productActions";
import spinner from '../Spinner';
import Swal from "sweetalert2";

const ProductCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toMusicBar = () => history.push("/musicbar");
  const products = useSelector((state) => state.products.productos);
  const { id } = useParams(); // con esto tomo el id de products que pido por ruta

  useEffect(() => {
    if (!products) return spinner();
    const cargarProductos = () => dispatch(getProductId(id));
    cargarProductos();
  }, []);

const handleStock = (stock, products) => { //Este handle verifica si hay stock o no.
  if (stock <= 0) { //En caso que no haya simplemente retorna un alert. 
    return Swal.fire({
  title: 'Ha ocurrido un error',
  text: "Al parecer, este producto ya no esta disponible :(",
  icon: 'error',
  confirmButtonText: 'Aceptar'
})
  } //Caso contrario agrega los productos al carrito
  dispatch(addProduct(products));
  dispatch(addToast({type: "success",content: "Producto agregado!!!",}));
}


  return (
    <div className="bodyb">
      <div className="container">
        <div className="row my-2">
          <div className="col-lg-6 col-md-6 shadow content p-5">
            <div className="row my-3">
              <div className="d-flex justify-content-end">
                <div className="arrows">
                  <i className="fas fa-arrow-circle-left" id="arrow1"></i>
                  <i className="fas fa-arrow-circle-right" id="arrow2"></i>
                </div>
              </div>
            </div>
            <div className="row my-lg-5 my-md-4">
              <h1>{products.name}</h1>
              <div className="price">
                $<span>{products.price}</span>
              </div>
              <hr className="line" />
              <p className="description">{products.description}</p>
            </div>

            <div>
              <hr className="line" />
              <p className="stock">Stock disponible: {products.stock}</p>
            </div>

            <div className="row my-3">
              {/*  <ul className="list-style">
                <li>
                  <i className="fas fa-long-arrow-alt-right"></i>&nbsp; High
                  Quality Audio
                </li>
                <li>
                  <i className="fas fa-long-arrow-alt-right"></i>&nbsp; You can
                  download it again anytime!
                </li>
                <li>
                  <i className="fas fa-long-arrow-alt-right"></i>&nbsp; All your
                  favorite artists are here!
                </li>
              </ul> */}
              {/*    <div className = 'renderBar'>
              {music ? <MusicBar /> : null}  
                </div> */}
            </div>
            <div className="row my-4 ">
              <div className="cart-btn d-flex justify-content-center">
                <div className="row-margin">
                  <button
                    type="button"
                    className="btn btn-custom text-white"
                    onClick={() => {
                      handleStock(products.stock, products)
                    }}
                  >
                    <i className="fas fa-shopping-basket"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 p-0 py-md-5 my-xs-0 my-lg-4 my-md-5">
            <div className="py-2 my-lg-0 my-md-5" id="imgcontainer">
              <img src={products.img} className="img-fluid" id="imgm"></img>
              <div class="overlay">
                <img
                  src="https://connectingclues.es/wp-content/uploads/2019/09/white-play-icon-png-7.png"
                  alt=""
                  onClick={() => toMusicBar()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

/* esto es para luego imprimir el music bar al tocar la foto del artista o banda  
  const [music, setMusic] = useState(false)
  const onButtonClick = () => setMusic(true) */
