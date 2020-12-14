import React, {useState} from "react";
import styles  from '../Product/productos-form.module.css'; 

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
		<div >
            <div className="d-flex justify-content-center ">
                <div xs={12} style={{marginTop:"20px"}} >
                    <h2>Formulario Categorías</h2>
                    <div class="mt-5" >
                        <form style={{width:"100%"}}>
                            <div class="mb-3">
                                <label for="nombre" className="form-label">Nombre: *</label>
                                <input type="text" className="form-control" id="nombre" placeholder="Categoría" name="name" onChange={handleChange}/>
                            </div>
                            
                            <div className="mt-3">
                                <label for="precio" className="form-label">Descripción: *</label>
                                <div class="form-floating">
                                    <textarea className="form-control"  id="descripcion" style={{height:"100px"}} onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <br />
                            <div className={styles.btnForm} className="d-grid gap-2 col-6 mx-auto">
                                <button variant="success" type="Guardar" style={{marginBottom:"20px"}} >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
		{/* <form onSubmit = {handleSubmit} style={{marginLeft:"400px", padding:"40px"}}>
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
	 	)*/}
} 

