import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Product_Card.css";
import { useHistory, useParams } from "react-router-dom";
/* import MusicBar from "../../components/MusicBar/MusicBar"; */
import { addProduct } from "../../redux/reducers/carritoReducer";
import { addToast } from "../../redux/reducers/toastReducer";
import { getProductId } from "../../redux/actions/productActions";
import spinner from "../Spinner";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getReviews } from "../../redux/actions/reviewActions";

const ProductCard = () => {
  const [reviewProductsId, setReviewProductsId] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const toMusicBar = () => history.push("/musicbar");
  const products = useSelector((state) => state.products.productos);
  const reviews = useSelector((state) => state.review.review);
  const { id } = useParams(); // con esto tomo el id de products que pido por ruta
  // Almaceno directamente las calificaciones en esta constante
  const ratingAverage = reviewProductsId.map((review) => review.rating);
  // Esto es para tomar la suma total de las calificaciones de los usuarios
  const ratingSum = reviewProductsId.reduce(
    (prev, curr) => prev + curr.rating,
    0
  );
  // Con esto saco el promedio
  const ratingAv = ratingSum / ratingAverage.length;

  useEffect(() => {
    if (!products) return spinner();
    const cargarProductos = () => dispatch(getProductId(id));
    cargarProductos();
  }, []);

  useEffect(() => {
    if (!reviews) return spinner();
    const cargarReviews = () => dispatch(getReviews(id));
    cargarReviews();
  }, []);

  useEffect(() => {
    if (!reviews) return spinner();
    setReviewProductsId(reviews);
  });

  const handleStock = (stock, products) => {
    //Este handle verifica si hay stock o no.
    if (stock <= 0) {
      //En caso que no haya simplemente retorna un alert.
      return Swal.fire({
        title: "Ha ocurrido un error",
        text: "Al parecer, este producto ya no esta disponible :(",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } //Caso contrario agrega los productos al carrito
    dispatch(addProduct(products));
    dispatch(addToast({ type: "success", content: "Producto agregado!!!" }));
  };

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
              <div className="d-flex justify-content-center">
                <ul className="ratingStarsProductId">
                  {reviewProductsId.length === 0
                    ? null
                    : Array.apply(null, { length: ratingAv.toFixed(1) }).map(
                        (e, i) => {
                          return (
                            <li key={i}>
                              {
                                <i
                                  className="fas fa-star"
                                  id="starsProductCard"
                                ></i>
                              }
                            </li>
                          );
                        }
                      )}
                </ul>
              </div>
              <p className="totalRating">
                {ratingAv ? ratingAv.toFixed(1) : null}
              </p>
              <p
                className="reviewsCount"
                onClick={handleShow}
                style={{ cursor: "pointer" }}
              >
                {ratingAverage.length === 0 ? (
                  <p
                    style={{ cursor: "auto", marginTop: "20px" }}
                    onClick={ratingAverage.length === 0}
                  >
                    Todavía nadie ha opinado sobre este producto
                  </p>
                ) : (
                  <p> {ratingAverage.length} opiniones</p>
                )}
              </p>
              <Modal
                show={ratingAverage.length === 0 ? false : show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modalReviews"
              >
                <Modal.Header closeButton className="modalBody">
                  <Modal.Title>
                    Los usuarios que compraron con nosotros opinaron esto:
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                  {!reviewProductsId
                    ? spinner()
                    : reviewProductsId.map((productReviews) => {
                        return (
                          <ul style={{ listStyle: "none" }}>
                            <li>
                              {Array.apply(null, {
                                length: productReviews.rating,
                              }).map((e, i) => {
                                return (
                                  <ul className="usersCalifications">
                                    <li
                                      key={i}
                                      className="usersCalificationsLine"
                                    >
                                      {
                                        <i
                                          className="fas fa-star"
                                          id="starsProductCard"
                                        ></i>
                                      }
                                    </li>
                                  </ul>
                                );
                              })}
                              <br />
                              {productReviews.user.username} opinó:
                              <br />
                              {productReviews.description}
                              <hr />
                            </li>
                          </ul>
                        );
                      })}
                </Modal.Body>
                <Modal.Footer className="modalBody">
                  <Button variant="danger" onClick={handleClose}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
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
                      handleStock(products.stock, products);
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
