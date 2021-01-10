import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { GetUsers } from "../../redux/actions/userActions";
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
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
    history.push("./");
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  /* if (isAuthenticated) {
    return <Redirect to = './'/>
  } */

  return (
    <div className="main-div">
      <div className="login">
        <div className="img"></div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <legend className="legend">Bienvenido</legend>
            <div>
              <i className="fas fa-user"></i>
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
              <i className="fas fa-lock"></i>
              <input
                placeholder="Ingrese su contraseña"
                type="password"
                name="password"
                value={data.password}
                className="password-user"
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
            <button className="button" type="submit">
              {" "}
              Iniciar sesión
            </button>
            <div>
              <Link to={"/user"}>
                <button className="registro">¿Eres nuevo? ¡Registrate!</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
