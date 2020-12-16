import React, {useState} from "react";
import styles  from '../Product/productos-form.module.css';
import { connect } from "react-redux";
import { addCategory } from "../../../redux/actions/categoryActions";

function AddCategories (props) {

const [data, setData] = useState({
	name: "",
	description: ""
});


const handleSubmit = (event) => {
	event.preventDefault ();
	console.log(event)
	props.addCategory (data);
	alert ("La categoria " + data.name + " ha sido agregada correctamente")
	setData ({name: "", description: ""})
}

const handleChange = (event) => {
	setData ({...data,
		 [event.target.name] : event.target.value
	})
}


	return (
		<div>
			<form onSubmit = {handleSubmit} style={{marginLeft:"400px", padding:"40px"}}>
	 		<div>
	 		<label> AÑADIR CATEGORIA </label>
	 		<br/>
	 		<input type="text" name = "name" placeholder = "Nombre..." onChange={handleChange} value = {data.name}/>
	 		<br/>
	 		<input type= "text" name = "description" placeholder = "Descripcion..." onChange={handleChange} value = {data.description} />
	 		<br/>
	 		<input type = "submit" value= "AÑADIR"/>
	 		</div>
	 		</form>
    </div>)
}

function mapDispatchToProps (dispatch) {
	return {
		addCategory : data => dispatch (addCategory(data))
	}
}

export default connect (null, mapDispatchToProps) (AddCategories);
