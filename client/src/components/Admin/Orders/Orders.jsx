import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./Orders.css";
import Pagination from "../../Pagination/Pagination";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import order from '../../../data/order.json'

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  let currentOrder = order.slice(indexOfFirstProduct, indexOfLastProduct);
  
  return (
    <div className="table-parent">
      <div className="row">
        <div className="button-groups">
          <ButtonGroup aria-label="Basic example" id="button-group">
            <Button variant="primary">New +</Button>
            <Button variant="danger">Delete</Button>
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
        </div>
        <Table responsive="lg" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>

              <th>Order ID</th>
              <th>Username</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {currentOrder.map((orders) => {
              return (
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <td>{orders.order_id}</td>
                  <td>{orders.username}</td>
                  <td>{orders.product_id}</td>
                  <td>{orders.product_name}</td>
                  <td>{orders.quantity}</td>
                  <td>{orders.price}</td>
                  <td>{orders.stock}</td>
                </tr>
              );
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
