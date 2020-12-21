import {
    CREAR_USUARIO
} from '../types/Users';
 import axios from 'axios'

 export default  function  CreateUser(file,data) {
   console.log(data)
  console.log(file) 
  const usuarioData = new FormData();
  usuarioData.append('username',data.username)
  usuarioData.append('givenName',data.givenName)
  usuarioData.append('familyName',data.familyName)
  usuarioData.append('email',data.email)
  usuarioData.append('password',data.password)
  usuarioData.append('file',file)
    return function(dispatch) {
      return axios.post("http://localhost:3001/user/", usuarioData)
        .then(res => dispatch({ type: CREAR_USUARIO, payload: res.file }));
       
    };
  }

/*   export default function CreateUser(data) {
    console.log(data)
      return function(dispatch) {
        return axios.post("http://localhost:3001/user/",{
       username: data.username,
        givenName: data.givenName,
          familyName: data.familyName,
           email: data.email,
            password: data.password,
              photoURL:data.photoURL,} )
          .then(res => dispatch({ type: CREAR_USUARIO, payload: res.data }));
         
      };
    } */