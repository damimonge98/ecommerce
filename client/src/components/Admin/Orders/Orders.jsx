import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
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
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orden);
  const history = useHistory();

  const [filter, setFilter] = useState("none");
  const [checked, setChecked] = useState(false)
  const [checkbox, setcheckbox] = useState({
    carrito:false,
    creada:false,
    procesando:false,
    cancelada:false,
    completada:false
  })

  const [searchTerm, setSearchTerm] = useState("")

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

  const handleCheckbox = e => {
    var elemento=e.target.name;
    var checkboxes = checkbox;
    if(checkbox[elemento] === false){
      for (let key in checkboxes) {
        checkboxes[key] = false;
      }
      checkboxes[e.target.name] = true;
    }else{
      const checkboxes = checkbox;
      for (let key in checkboxes) {
        checkboxes[key] = false;
      }
    }
     
    setcheckbox( checkboxes );

    if (filter === e.target.value) setFilter("none");
    else {
      setFilter(e.target.value);
      setChecked(true)};
  };

  const lista=()=> {
    return currentOrder.filter(item => {
      const state=item.state.toString().toLowerCase();
      if (state === filter ){
        return state.includes(filter)
      }else if(filter === "none"){
        return currentOrder
      }
    });
  }


 
  return (
    <div className="table-parent">
      <div class="mb-4">
        <div className="row">
          <div className="d-flexsearch form-check form-check-inline mb-3  col-2" >
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"  id="input-filtersearch" onChange={e=>{setSearchTerm(e.target.value)}}  data-toggle="tooltip" data-placement="top" title="Buscar por email o estado"/>
          </div>
        <div className="checks col-10 pl-5 ">
          <div class="form-check form-check-inline ">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="carrito" name="carrito" checked={checkbox.carrito}  onChange={handleCheckbox} data-toggle="tooltip" data-placement="top" title="Filtrar por estado carrito"/>
            <label class="form-check-label" for="inlineCheckbox1">Carrito</label>
          </div>
          <div class="form-check form-check-inline  ">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="creada" name="creada" checked={checkbox.creada} onChange={handleCheckbox} data-toggle="tooltip" data-placement="top" title="Filtrar por estado creada"/>
            <label class="form-check-label" for="inlineCheckbox2">Creada</label>
          </div>
          
          <div class="form-check form-check-inline ">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="procesando" name="procesando" checked={checkbox.procesando} onChange={handleCheckbox} data-toggle="tooltip" data-placement="top" title="Filtrar por estado procesando"/>
            <label class="form-check-label" for="inlineCheckbox3">Procesando</label>
          </div>
          <div class="form-check form-check-inline ">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="cancelada" name="cancelada" checked={checkbox.cancelada} onChange={handleCheckbox} data-toggle="tooltip" data-placement="top" title="Filtrar por estado cancelada"/>
            <label class="form-check-label" for="inlineCheckbox3">Cancelada</label>
          </div>
          <div class="form-check form-check-inline ">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="completada" name="completada" checked={checkbox.completada} onChange={handleCheckbox} data-toggle="tooltip" data-placement="top" title="Filtrar por estado completada"/>
            <label class="form-check-label" for="inlineCheckbox3">Completada</label>
          </div>
        </div>
        </div>
      </div>
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
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {!lista() 
              ? spinner()
              : Array.isArray(lista()) &&
              lista().filter(val=>{
                if(searchTerm==""){
                  return val
                }else if(val.state.toLowerCase().includes(searchTerm.toLowerCase()) || val.user.email.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
                }
              }).map((allOrder) => {
                return (
                  <tr key={orders.id}>
                    {/*   <th>
                          <input
                            type="checkbox" onClick={() => getId(order.id)}
                          />
                        </th> */}
                    <td style={{ cursor: 'pointer' }} onClick={() => history.push(`/admin/orders/${allOrder.id}`)}>{allOrder.id}</td>
                    <td style={{ cursor: 'pointer' }} onClick={() => history.push(`/admin/orders/users/${allOrder.user.id}`)}>{allOrder.user.id}</td>
                    <td style={{ cursor: 'pointer' }} onClick={() => history.push(`/admin/orders/users/${allOrder.user.id}`)}>{allOrder.user.username}</td>
                    <td>{allOrder.user.email}</td>
                    <td>{allOrder.state}</td>
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