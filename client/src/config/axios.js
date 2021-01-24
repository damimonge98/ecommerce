import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


var accesToken =   localStorage.getItem("tokenLogin");
  


const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers:{
		Authorization:`Bearer ${accesToken}`
	},

});


export default clienteAxios