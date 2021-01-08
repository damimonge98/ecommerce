import React from "react";
import NavBar from "./NavBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import styles from "./privacity.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default function UserPrivacity () {

    const dispatch = useDispatch()
    const authUser = useSelector(state=> state.user.userAUTH)
    
    return (
    <div>
        <NavBar/>
        <div className = {styles.containerDiv}>
		    <div className = {styles.titleDiv}> <i class="fa fa-cogs" aria-hidden="true"></i> Ajustes de privacidad </div>
                <div className = {styles.editimg}>
                <img src = {authUser.photoURL} className = {styles.img}/>
                <Button> Cambiar foto </Button>
                </div>
            <div className={styles.formdiv}>
            <Form>
            <Form.Label> Nombre: </Form.Label>
	 		<Form.Control readonly class="form-control-plaintext" type="text" column = "sm" size = "sm" name = "name"  placeholder = {authUser.givenName}/>

            <Form.Label> Apellido: </Form.Label>
	 		<Form.Control readonly class="form-control-plaintext" type="text" column = "sm" size = "sm" name = "name"  placeholder = {authUser.familyName}/>
            

            <Form.Label> Username: </Form.Label>
	 		<Form.Control readonly class="form-control-plaintext" type="text" column = "sm" size = "sm" name = "name"  placeholder = {authUser.username}/>

            <Form.Label> Password: </Form.Label>
	 		<Form.Control readonly class="form-control-plaintext" type="text" column = "sm" size = "sm" name = "name"  placeholder = "*****************"/>
            
            <Button type = "submit" className = {styles.btnSubmit}> Guardar</Button>
            </Form>


             </div>   




            </div>
    </div>


    )
}