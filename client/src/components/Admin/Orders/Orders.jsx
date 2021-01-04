import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./Orders.css";
import Pagination from "../../Pagination/Pagination";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { getOrder } from "../../../redux/actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import spinner from "../../Spinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orden);

  let currentOrder =
    Array.isArray(orders) &&
    orders.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    const cargarOrdenes = () => dispatch(getOrder());
    setOrders(cargarOrdenes());
  }, []);

  useEffect(() => {
    setOrders(order);
  });

  /*  const getId = (id) => {
    const checkboxId = orders.find((order) => id === order.id);
    setCheckbox(checkboxId);
  };

  const removeData = (id) => {
    const deleteOrder = Array.isArray(orders) && orders.filter((c) => id !== c.id);
    setOrders(deleteOrder);
  }; */

  console.log("currentOrder:", currentOrder);
  return (
    <div className="table-parent">
      <div className="row">
       {/*  <div className="button-groups">
          <ButtonGroup aria-label="Basic example" id="button-group">
            <Button variant="primary">Edit</Button>
            <Button
              variant="danger"  onClick={() => removeData(checkbox)}
            >
              Delete
            </Button>
            <Button variant="success">Download</Button>
            <div className="navSearch">
              <div class="form-group has-search">
                <span
                  class="fa fa-search form-control-feedback"
                  id="icon-search"
                ></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  id="input-search"
                />
              </div>
            </div>
          </ButtonGroup>
        </div> */}
        <Table responsive="lg" striped bordered hover variant="dark">
          <thead>
            <tr>
            {/*   <th>
                <input type="checkbox" />
              </th> */}
              <th>Order ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Stock</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {!currentOrder
              ? spinner()
              : Array.isArray(currentOrder) &&
                currentOrder.map((allOrder) => {
                  return allOrder.products.map((productOrder) => {
                    return (
                      <tr key={orders.id}>
                      {/*   <th>
                          <input
                            type="checkbox" onClick={() => getId(order.id)}
                          />
                        </th> */}
                        <td>{allOrder.id}</td>
                        <td>{allOrder.user.username}</td>
                        <td>{allOrder.user.email}</td>
                        <td>{productOrder.id}</td>
                        <td>{productOrder.name}</td>
                        <td>{productOrder.lineOrder.cantidad}</td>
                        <td>{productOrder.price}</td>
                        <td>{productOrder.stock}</td>
                        <td>{allOrder.state}</td>
                      </tr>
                    );
                  });
                })}
          </tbody>
        </Table>
      </div>
      <div className="pag">
        <div className="pagnation">
          <Pagination
            productPerPage={productPerPage}
            totalproduct={order.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
