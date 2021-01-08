import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./accountSettings.module.css";
import NavBar from "./NavBar.jsx";




export default function AccountSettings () {
	const dispatch = useDispatch()
	const authUser = useSelector(state=> state.user.userAUTH)
	console.log(authUser)

	return (	<div>
				<NavBar/>
					<div className = {styles.containerDiv}>
					<div className = {styles.titleDiv}> <i class="fa fa-user-circle-o" aria-hidden="true"></i> Mi cuenta </div>
					<div className = {styles.optionDiv}> username: {authUser.username}</div>
					<div className = {styles.optionDiv}> Nombre y apellido: {authUser.givenName +" "+ authUser.familyName } </div>
					<div className = {styles.optionDiv}> Email: {authUser.email} </div>
					</div>	
				</div>
		)

}