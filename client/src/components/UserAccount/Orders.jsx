import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserOrderDetail} from "../../redux/actions/orderActions.js";
import NavBar from "./NavBar.jsx";
import styles from "./orders.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function UserOrders () {
	const dispatch = useDispatch ();

	const res = useSelector ((state) => state.order.orden)
	const idUser = useSelector ((state)=> state.user.userAUTH.id)

	const [state, setState] = useState (0) //Estado solamente para que el useEffect reconozca 
	//un cambio en el componente y lo vuelva a renderizar

	useEffect(() => {
      const obtenerUserOrden = () => dispatch (getUserOrderDetail(idUser));
       obtenerUserOrden()
	}, [state])
	
	

	console.log(res)

	
	//handle para pasar el indice del producto a la tabla y que se rendericen 
	//los datos de el producto que el usuario eliga
	function handleProduct  (productIdIndex, orderId) {
		window.index = productIdIndex
		window.orderId = orderId
		setState (state+1)
	}

	console.log(window.index)
	console.log(window.orderId)


	return (
		<div>
			<NavBar/>
			<div className = {styles.table}>
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
    				</tr>
  				</thead>

  				<tbody>

  				{res.map((el) => {
  					return (
  						<tr>	
    				<th scope="row">{el.id}</th>

			      	<td> <DropdownButton> 
			      	{el.products.map((product) => {
			      		return (<Dropdown.Item onClick = {() => handleProduct(el.products.indexOf(product), el.id)}> {product.name} </Dropdown.Item>)
			      	})}
			      	</DropdownButton></td>

			      	<td>{el.products.[window.index] && (window.orderId === el.id)  ? el.products[window.index].name : ""}</td>
			      	<td>{el.products.[window.index] && (window.orderId === el.id)? el.products[window.index].description : ""}</td>
			      	<td>{el.products.[window.index] && (window.orderId === el.id) ? el.products[window.index].lineOrder.cantidad : ""}</td>
			    	<td>{el.products.[window.index] && (window.orderId === el.id) ? el.products[window.index].price : ""}</td>
			    	<td>{el.state}</td>
			    	<td>{el.updatedAt}</td>
			    </tr>
			    )})}
			  	</tbody>
				</table>
			</div>



		</div>)
}