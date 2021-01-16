import axios from 'axios';


var accesToken =   localStorage.getItem("tokenLogin");
  


const clienteAxios = axios.create({
    baseURL: 'http://localhost:3001/',
    headers:{
		Authorization:`Bearer ${accesToken}`
	},

});


export default clienteAxios