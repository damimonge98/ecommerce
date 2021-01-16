import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { GetUsers, GetUsersGoogle } from "../../redux/actions/userActions";
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleLogin from "react-google-login";
import bcrypt from "bcryptjs";
function Login(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [userName, setUsername] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userAUTH);
  const loginUser = async (data) => dispatch(GetUsers(data));
  console.log(data);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setUsername(user);
  });
  /* console.log(userName.username) */

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(data);
    await Swal.fire({
      icon: "success",
      title: `Bienvenido`,
      showConfirmButton: true,
      background: "#19191a",
    });
    history.push("./account/me");
  };
  /* const loguearGoogle=async()=>{
  await loginGoogle()
} */
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="./" />;
  }

  const responseGoogle = async (res) => {
    try {
     setData({
      ...data,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    });
    await loginUser(data);
    await Swal.fire({
      icon: "success",  
      title: `Bienvenido`,
      showConfirmButton: true,
      background: "#19191a",
    });
  } catch(error) {
    console.log("error", error)
  }
  };

  return (
    <div className="main-div">
      <div className="login">
        <div className="img"></div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <legend className="legend">Bienvenido</legend>
            <div>
              <i className="fas fa-user" id="iconUser"></i>
              <input
                placeholder="Ingrese su usuario"
                type="text"
                name="email"
                value={data.email}
                className="name-user"
                onChange={handleChange}
              ></input>
            </div>
            <br></br>
            <div>
              <i className="fas fa-lock" id="iconPassword"></i>
              <input
                placeholder="Ingrese su contraseña"
                type="password"
                name="password"
                value={data.password}
                className="passwordUser"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <Link to={"#"}>
                <a>
                  <p className="link">¿Olvidaste tu contraseña?</p>
                </a>
              </Link>
            </div>
            <button className="buttonLogin" type="submit">
              {" "}
              Iniciar sesión
            </button>
            <div>
              <Link to={"/user"}>
                <button className="registro">
                  ¿No tienes cuenta? ¡Registrate!
                </button>
              </Link>
            </div>
          </form>
          <GoogleLogin
            clientId="62493798452-akjoostfaul0rmoqbfjfvbusiqnbj9u3.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
