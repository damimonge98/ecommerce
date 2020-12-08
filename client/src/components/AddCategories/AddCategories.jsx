import React, {useState} from "react";


export default function AddCategories () {

const [data, setData] = useState({
	name: "",
	description: ""
});

const handleSubmit = (event) => {
	alert ("La categoría " + data.name +" ha sido agregada")

}

const handleChange = (event) => {
	setData ({...data,
		 [event.target.name] : event.target.value
	})
}

 
	return (
		
		<form onSubmit = {handleSubmit}>
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
		)
}

