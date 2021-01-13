import {
  CREAR_USUARIO,
  LOGIN_USER,
  LOGOUT_USER
} from '../types/Users';
import clienteAxios from '../../config/axios.js';
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
    return clienteAxios.post("/user", usuarioData)
      .then(res => dispatch({ type: CREAR_USUARIO, payload: res.file })
      );
  };
}

export function  GetUsers (credencial) {
  return async function(dispatch) {
     const respuesta = await clienteAxios.post("/login" , credencial)
     const tokenDecode = jsonWebToken.decode(respuesta.data.token)
        await dispatch(loginUser(tokenDecode.user))
        window.localStorage.setItem("tokenLogin",respuesta.data.token)
        console.log("RESPUESTA",respuesta)
       // const tokenDecode = jsonWebToken.decode(respuesta.data.token)
       // await dispatch(setUsers(tokenDecode))
  };
}
const loginUser =(user)=>(
  { type: LOGIN_USER, payload: user }
)

//logout
export function logoutAction () {
  return async function(dispatch) {
        await window.localStorage.removeItem("tokenLogin");
        await window.localStorage.removeItem("state"); 
        await dispatch(logoutUser())
  };
}

const logoutUser =()=>(
  { type: LOGOUT_USER, payload: null }

  
)
export function  GetUsersGoogle () {
  return async function(dispatch) {
     const respuesta = await clienteAxios.get("/login/auth/google")
     /* const tokenDecode = jsonWebToken.decode(respuesta.data.token) */
        /* await dispatch(loginUser(tokenDecode.user)) */
        /* window.localStorage.setItem("tokenLogin",respuesta.data.token) */
        console.log("RESPUESTA",respuesta)
       // const tokenDecode = jsonWebToken.decode(respuesta.data.token)
       // await dispatch(setUsers(tokenDecode))
  };
}