import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrderDetail,
  getOrderDetail,
} from "../../redux/actions/orderActions.js";
import { useHistory } from "react-router-dom";
import { addReview } from "../../redux/actions/reviewActions";
import NavBar from "./NavBar.jsx";
import styles from "./orders.module.css";
import "./closeBtn.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal"; 
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import spinner from "../Spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const res = useSelector((state) => state.order.orden);
  const idUser = useSelector((state) => state.user.userAUTH.id);
  let url = window.location.pathname;
  let id = url.substring(url.lastIndexOf("/") + 1);
  //Para manejar el Review
  const history = useHistory();
  const [data, setData] = useState({
    description: "",
    rating: 0,
    count: 0,
    userId: idUser,
    clicked: false,
  });

  const [state, setState] = useState(0); //Estado solamente para que el useEffect reconozca
  //un cambio en el componente y lo vuelva a renderizar
  useEffect(() => {
    const obtenerUserOrden = () => dispatch(getUserOrderDetail(idUser));
    obtenerUserOrden();
  }, [state]);
  const [open, setOpen] = useState(false);

  //handle para pasar el indice del producto a la tabla y que se rendericen
  //los datos de el producto que el usuario eliga
  function handleProduct(productIdIndex, orderId) {
    window.index = productIdIndex;
    window.orderId = orderId;
    setState(state + 1);
  }

  // Para obtener los cambios del review
  const handleChange = (e) =>
    setData({
      ...data,
      count: e.target.value.length,
      description: e.target.value,
    });

  useEffect(() => {
    if (!res) return spinner();
    const cargarOrdenes = () => dispatch(getOrderDetail(id));
    cargarOrdenes();
  }, []);

  return (
    <div>
      <NavBar />

      <div className={styles.table}>
        <h1>Detalle de la orden #{res[0].id}</h1>
        <hr />
        <Table striped bordered variant="dark">
          <thead>
            <th scope="col"></th>
          </thead>
          <tbody>
            {res.map((el) => {
              return (
                <tr style={{ borderBottom: "1px solid black" }}>
                    <div style={{backgroundColor:"#21252"}}>
                  <Row className="align-items-center" >
                    <Col >
                      <h6 >Fecha Creada/Actualizada</h6>
                    </Col>
                    <Col>
                      <h6>{el.updatedAt}</h6>
                    </Col>
                  </Row>
                  </div>
                  <Row className="align-items-center">
                    <Col>
                      <h6>Número de orden</h6>
                    </Col>
                    <Col>
                      <h6>{el.id}</h6>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <h6>Productos</h6>
                    </Col>
                    <Col>
                    <DropdownButton>
                      {el.products.map((product) => {
                        return (
                          <Dropdown.Item
                            onClick={() =>
                              handleProduct(el.products.indexOf(product), el.id)
                            }
                          >
                            {product.name}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <h6>Descripción</h6>
                    </Col>
                    <Col>
                      <h6>
                        {el.products[window.index] && window.orderId === el.id
                          ? el.products[window.index].description
                          : ""}
                      </h6>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <h6>Cantidad</h6>
                    </Col>
                    <Col>
                      <h6>
                        {" "}
                        {el.products[window.index] && window.orderId === el.id
                          ? el.products[window.index].lineOrder.cantidad
                          : ""}{" "}
                      </h6>{" "}
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <h6>Precio</h6>
                    </Col>
                    <Col>
                      <h6>
                        {el.products[window.index] && window.orderId === el.id
                          ? el.products[window.index].price
                          : ""}
                        ,00$
                      </h6>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <h6>Review</h6>
                    </Col>
                    <Col>
                      <Button
                        onClick={handleShow}
                        className={styles.titleReviewFormUser}
                        variant="success"
                      >
                        Si te gustó podés dejarnos una reseña!
                      </Button>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        className={styles.modalContainer}
                      >
                        <Modal.Header closeButton className={styles.modalStyle}>
                          <Modal.Title className={styles.modalStyle}>
                            En{" "}
                            <img
                              src="https://bit.ly/37jca0M"
                              style={{ height: "30px" }}
                            />{" "}
                            nos importa lo que tenés para decir!
                          </Modal.Title>
                        </Modal.Header>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(
                              addReview(data, el.products[window.index].id)
                            );
                            history.push("/");
                          }}
                        >
                          <Modal.Body className={styles.modalStyle}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label className={styles.labelDescription}>
                                Cuéntanos que te pareció{" "}
                                {el.products[window.index] &&
                                window.orderId === el.id
                                  ? el.products[window.index].name
                                  : ""}
                              </Form.Label>
                            </Form.Group>

                            <textarea
                              className={styles.inputDescription}
                              onChange={(e) => handleChange(e)}
                              maxlength={1000}
                              value={data.description}
                            />
                            <p className={styles.countCharacters}>
                              {data.count}/1000
                            </p>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label className={styles.labelDescription}>
                                ¿Cómo calificarías tu experiencia?
                              </Form.Label>
                            </Form.Group>

                            <div
                              class="starrating risingstar d-flex justify-content-center flex-row-reverse"
                              id="divStars"
                            >
                              <input
                                type="radio"
                                id="star5"
                                name="rating"
                                value={data.rating}
                                onClick={() => setData({ ...data, rating: 5 })}
                              />
                              <label for="star5" title="5 star"></label>
                              <input
                                type="radio"
                                id="star4"
                                name="rating"
                                value={data.rating}
                                onClick={() => setData({ ...data, rating: 4 })}
                              />
                              <label for="star4" title="4 star"></label>
                              <input
                                type="radio"
                                id="star3"
                                name="rating"
                                value={data.rating}
                                onClick={() => setData({ ...data, rating: 3 })}
                              />
                              <label for="star3" title="3 star"></label>
                              <input
                                type="radio"
                                id="star2"
                                name="rating"
                                value={data.rating}
                                onClick={() => setData({ ...data, rating: 2 })}
                              />
                              <label for="star2" title="2 star"></label>
                              <input
                                type="radio"
                                id="star1"
                                name="rating"
                                value={data.rating}
                                onClick={() => setData({ ...data, rating: 1 })}
                              />
                              <label for="star1" title="1 star"></label>
                            </div>
                          </Modal.Body>
                          <Modal.Footer className={styles.modalStyle}>
                            <Button variant="danger" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="success" type="submit">
                              Enviar
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
                    </Col>
                  </Row>
                  {/* <tr style={{ width: "1000px" }}>
                    <th>Número de orden:</th>
                    <td>{el.id}</td>
                  </tr>
                  <tr>
                    <th>Productos:</th>
                    <td> <DropdownButton>
                      {el.products.map((product) => {
                        return (
                          <Dropdown.Item
                            onClick={() =>
                              handleProduct(el.products.indexOf(product), el.id)
                            }
                          >
                            {product.name}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton></td>
                  </tr>
                  <tr>
                  <th>Producto:</th>
                    <td> {el.products[window.index] && window.orderId === el.id
                      ? el.products[window.index].name
                      : ""}</td>
                  </tr>
                  <tr>
                    <th>Descripcion:</th>
                    <td>{el.products[window.index] && window.orderId === el.id
                      ? el.products[window.index].description
                      : ""}</td>
                  </tr>
                  <tr>
                    <th>Cantidad:</th>
                    <td>{el.products[window.index] && window.orderId === el.id
                      ? el.products[window.index].lineOrder.cantidad
                      : ""}</td>
                  </tr>
                  <tr>
                    <th>Precio:</th>
                    <td>{el.products[window.index] && window.orderId === el.id
                      ? el.products[window.index].price
                      : ""}</td>
                  </tr>
                  <tr>
                    <th>Review:</th>
                  <td>
                    <Button
                      onClick={handleShow}
                      className={styles.titleReviewFormUser}
                      variant="success"
                    >
                      Si te gustó podés dejarnos una reseña!
                    </Button>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                      className={styles.modalContainer}
                    >
                      <Modal.Header closeButton className={styles.modalStyle}>
                        <Modal.Title className={styles.modalStyle}>
                          En{" "}
                          <img
                            src="https://bit.ly/37jca0M"
                            style={{ height: "30px" }}
                          />{" "}
                          nos importa lo que tenés para decir!
                        </Modal.Title>
                      </Modal.Header>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          dispatch(
                            addReview(data, el.products[window.index].id)
                          );
                          history.push("/");
                        }}
                      >
                        <Modal.Body className={styles.modalStyle}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label className={styles.labelDescription}>
                              Cuéntanos que te pareció{" "}
                              {el.products[window.index] &&
                              window.orderId === el.id
                                ? el.products[window.index].name
                                : ""}
                            </Form.Label>
                          </Form.Group>

                          <textarea
                            className={styles.inputDescription}
                            onChange={(e) => handleChange(e)}
                            maxlength={1000}
                            value={data.description}
                          />
                          <p className={styles.countCharacters}>
                            {data.count}/1000
                          </p>
                          <Form.Group controlId="formBasicPassword">
                            <Form.Label className={styles.labelDescription}>
                              ¿Cómo calificarías tu experiencia?
                            </Form.Label>
                          </Form.Group>

                          <div class="starrating risingstar d-flex justify-content-center flex-row-reverse" id = "divStars">
                            <input
                              type="radio"
                              id="star5"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 5 })
                              }
                            />
                            <label for="star5" title="5 star">
                              
                            </label>
                            <input
                              type="radio"
                              id="star4"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 4 })
                              }
                            />
                            <label for="star4" title="4 star">
                              
                            </label>
                            <input
                              type="radio"
                              id="star3"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 3 })
                              }
                            />
                            <label for="star3" title="3 star">
                              
                            </label>
                            <input
                              type="radio"
                              id="star2"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 2 })
                              }
                            />
                            <label for="star2" title="2 star">
                              
                            </label>
                            <input
                              type="radio"
                              id="star1"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 1 })
                              
                              }
                            />
                            <label for="star1" title="1 star">
                              
                            </label>
                          </div>
                        </Modal.Body>
                        <Modal.Footer className={styles.modalStyle}>
                          <Button variant="danger" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="success" type="submit">
                            Enviar
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </Modal>
                  </td>  */}
                  {/*  <tr scope="col" >
                      <td>Número de orden</td>
                      </tr>
                  <tr scope="row">{el.id}</tr>
 */}
                  {/* <td>
                    <DropdownButton>
                      {el.products.map((product) => {
                        return (
                          <Dropdown.Item
                            onClick={() =>
                              handleProduct(el.products.indexOf(product), el.id)
                            }
                          >
                            {product.name}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </td> */}

                  {/* <td>
                    {el.products[window.index] && window.orderId === el.id
                      ? el.products[window.index].name
                      : ""}
                  </td>
                  <td>
                    {el.products[window.index] && window.orderId === el.id
                      ? el.products[window.index].description
                      : ""}
                  </td>
                  <td>
                    {el.products[window.index] && window.orderId === el.id
                      ? el.products[window.index].lineOrder.cantidad
                      : ""}
                  </td>
                  <td>
                    {el.products[window.index] && window.orderId === el.id
                      ? el.products[window.index].price
                      : ""}
                  </td>
                  <td>{el.updatedAt}</td> */}
                  {/* <td>
                    <Button
                      onClick={handleShow}
                      className={styles.titleReviewFormUser}
                      variant="success"
                    >
                      Si te gustó podés dejarnos una reseña!
                    </Button>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                      className={styles.modalContainer}
                    >
                      <Modal.Header closeButton className={styles.modalStyle}>
                        <Modal.Title className={styles.modalStyle}>
                          En{" "}
                          <img
                            src="https://bit.ly/37jca0M"
                            style={{ height: "30px" }}
                          />{" "}
                          nos importa lo que tenés para decir!
                        </Modal.Title>
                      </Modal.Header>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          dispatch(
                            addReview(data, el.products[window.index].id)
                          );
                          history.push("/");
                        }}
                      >
                        <Modal.Body className={styles.modalStyle}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label className={styles.labelDescription}>
                              Cuéntanos que te pareció{" "}
                              {el.products[window.index] &&
                              window.orderId === el.id
                                ? el.products[window.index].name
                                : ""}
                            </Form.Label>
                          </Form.Group>

                          <textarea
                            className={styles.inputDescription}
                            onChange={(e) => handleChange(e)}
                            maxlength={1000}
                            value={data.description}
                          />
                          <p className={styles.countCharacters}>
                            {data.count}/1000
                          </p>
                          <Form.Group controlId="formBasicPassword">
                            <Form.Label className={styles.labelDescription}>
                              ¿Cómo calificarías tu experiencia?
                            </Form.Label>
                          </Form.Group>

                          <div class="starrating risingstar d-flex justify-content-center flex-row-reverse" id = "divStars">
                            <input
                              type="radio"
                              id="star5"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 5 })
                              }
                            />
                            <label for="star5" title="5 star">
                              
                            </label>
                            <input
                              type="radio"
                              id="star4"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 4 })
                              }
                            />
                            <label for="star4" title="4 star">
                              
                            </label>
                            <input
                              type="radio"
                              id="star3"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 3 })
                              }
                            />
                            <label for="star3" title="3 star">
                              
                            </label>
                            <input
                              type="radio"
                              id="star2"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 2 })
                              }
                            />
                            <label for="star2" title="2 star">
                              
                            </label>
                            <input
                              type="radio"
                              id="star1"
                              name="rating"
                              value={data.rating}
                              onClick={() =>
                                setData({ ...data, rating: 1 })
                              
                              }
                            />
                            <label for="star1" title="1 star">
                              
                            </label>
                          </div>
                        </Modal.Body>
                        <Modal.Footer className={styles.modalStyle}>
                          <Button variant="danger" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="success" type="submit">
                            Enviar
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </Modal>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
{
  /* <i
  onClick={() => {
    setData({ ...data, rating: i + 1 });
    starsHandler();
  }}
  style={{
    color: starClicked.clicked === true ? "yellow" : "white",
    cursor: "pointer",
  }}
  className="fas fa-star"
  value={data.rating}
  id={styles.starsFormRating}
></i>;
 */
}
