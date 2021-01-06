import {
  CREAR_USUARIO,
  LOGIN_USER,
  USER_AUNTENTICADO
} from '../types/Users';
import axios from 'axios'
import jsonWebToken from 'jsonwebtoken'

export default function  CreateUser(file,data) {
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

export function  GetUsers (credencial) {
  return async function(dispatch) {
     const respuesta = await axios.post("http://localhost:3001/login" , credencial)
        dispatch(loginUser(respuesta.data))
        window.localStorage.setItem("tokenLogin",respuesta.data.token)
        console.log("RESPUESTA",respuesta)
        const tokenDecode = jsonWebToken.decode(respuesta.data.token)
        dispatch(setUsers(tokenDecode))
  };
}
const loginUser =(user)=>(
{ type: LOGIN_USER, payload: user }
)


export function  setUsers(user) {
return function(dispatch) {
   dispatch(userLogin(user))
};
}
const userLogin=(user)=>(
{type: USER_AUNTENTICADO, payload: user}
)

