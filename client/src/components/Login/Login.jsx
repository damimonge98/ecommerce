import React, {useEffect, useState} from 'react';
import './Login.css'
import { Link } from "react-router-dom";
import { GetUsers,setUsers } from '../../redux/actions/userActions';
import {useDispatch, useSelector} from 'react-redux'
import jsonWebToken from 'jsonwebtoken'

function Login(props) {
    const [data, setData] = useState({
        email: "",
        password:"",
    });
    const [tokenKey, setTokenKey]= useState({})

    const dispatch = useDispatch()

    const loginUser = async data =>dispatch(GetUsers(data))
    const userAUTH =  data => dispatch(setUsers(data))

  useEffect(()=>{
      const local = window.localStorage.getItem("tokenLogin") 
    if(local){ 
       const tokenDecode = jsonWebToken.decode(local)
       userAUTH(tokenDecode)
    }
    },[]) 

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const  handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(data)
    await setTokenKey(token)
  
}
  const token = useSelector(state=>state.user.token);

  
  return( 
    <div className="main-div">
        <div className="login" >
            <div className="img">
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                <legend className="legend">Bienvenido</legend>
                    <div>
                    <i className="fas fa-user"></i>
                    <input placeholder="Ingrese su usuario"
                     type="text"
                      name="email"
                      value={data.email}
                       className="name-user"
                        onChange={handleChange}>
                    </input>
                    </div>
                    <br></br>
                    <div>
                    <i className="fas fa-lock"></i>
                    <input placeholder="Ingrese su contraseña"
                     type="password"
                      name="password"
                      value={data.password}
                       className="password-user"
                        onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <Link to={"#"}>
                        <a><p className="link">olvidaste tu contraseña?</p></a>
                        </Link>
                    </div>
                    <button className="button" type="submit"> Iniciar sesion</button>
                    <div>
                        <Link to={"/user"}>
                        <button className="registro" >Eres nuevo? Registrate</button>
                        </Link>
                    </div>
                </form>
            </div>            
        </div>
    </div>
  )
};


export default Login;