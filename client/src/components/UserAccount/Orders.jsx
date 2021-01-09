import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderDetail } from "../../redux/actions/orderActions.js";
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

export default function UserOrders() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const res = useSelector((state) => state.order.orden);
  const idUser = useSelector((state) => state.user.userAUTH.id);
  //Para manejar el Review
  const history = useHistory();
  const [data, setData] = useState({
    description: "",
    rating: 0,
    count: 0,
    userId: idUser,
  });

  const [state, setState] = useState(0); //Estado solamente para que el useEffect reconozca
  //un cambio en el componente y lo vuelva a renderizar
  useEffect(() => {
    const obtenerUserOrden = () => dispatch(getUserOrderDetail(idUser));
    obtenerUserOrden();
  }, [state]);

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

  return (
    <div>
      <NavBar />
      <div className={styles.table}>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">#OrderId</th>
              <th scope="col">Productos</th>
              <th scope="col">Producto</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio</th>
              <th scope="col">Estado</th>
              <th scope="col">Creada/Actualizada</th>
              <th scope="col">Review</th>
            </tr>
          </thead>

          <tbody>
            {res.map((el) => {
              return (
                <tr>
                  <th scope="row">{el.id}</th>

                  <td>
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
                  </td>

                  <td>
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
                  <td>{el.state}</td>
                  <td>{el.updatedAt}</td>
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
                      <Modal.Header closeButton className ={styles.modalStyle}>
                        <Modal.Title className ={styles.modalStyle}>
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
                          dispatch(addReview(data, el.products[window.index].id));
                          history.push('/')
                        }}>
                        <Modal.Body className ={styles.modalStyle}>
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

                          <ul className={styles.ratingStars}>
                            {Array.apply(null, { length: 5 }).map((e, i) => {
                              return (
                                <li key={i}>
                                  {
                                    <i
                                      onClick={() =>
                                        setData({ ...data, rating: i + 1 })
                                      }
                                      className="fas fa-star"
                                      value={data.rating}
                                    ></i>
                                  }
                                </li>
                              );
                            })}
                          </ul>
                        </Modal.Body>
                        <Modal.Footer className ={styles.modalStyle}>
                          <Button variant="danger" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="success" type="submit">
                            Enviar
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
