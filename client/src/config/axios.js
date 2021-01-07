import axios from 'axios';


const accesToken = window.localStorage.getItem("tokenLogin")
const clienteAxios = axios.create({
    baseURL: 'http://localhost:3001/',
    headers:{
		Authorization:`Bearer ${accesToken}`
	},

});


export default clienteAxios