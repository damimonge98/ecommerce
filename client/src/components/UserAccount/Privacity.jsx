import React, { Fragment, useState, useEffect } from "react";
import NavBar from "./NavBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import styles from "./privacity.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  updateUser,
  resetPassword,
  logoutAction,
  editUserImage,
} from "../../redux/actions/userActions.js";
import { clearCarrito } from "../../redux/reducers/carritoReducer";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "axios";
import { Link } from "react-router-dom";

export default function UserPrivacity() {
  const history = useHistory();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.userAUTH);
  const verifyImg = useSelector((state) => state.user);
  const [data, setData] = useState({
    givenName: authUser.givenName,
    familyName: authUser.familyName,
    username: authUser.username,
    email: authUser.email,
  });

  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [infoType, setInfoType] = useState([]);
  const [verifyInfo, setVerifyInfo] = useState(false);
  const [photoURL, setphotoURL] = useState(authUser.photoURL);

  console.log(photoURL);

  useEffect(() => {
    authUser.photoURL = photoURL;
  }, [photoURL]);

  const handleChange = function (e) {
    console.log(e.target.value);
    console.log(authUser[infoType[0]]);
    setData({ ...data, [e.target.name]: e.target.value });

    if (
      e.target.value !== authUser[infoType[0]] &&
      e.target.value.length !== 0
    ) {
      setVerifyInfo(false);
      return;
    } else {
      setVerifyInfo(true);
    }
  };

  //handle que maneja validacion y update de la info
  const handleSubmit = function (e) {
    e.preventDefault();

    if (verifyInfo === true) {
      Swal.fire({
        icon: "error",
        text: "Debe ingresar un campo diferente al existente.",
      });
      return;
    }
    dispatch(updateUser(authUser.id, data));

    Swal.fire({
      title: "Cambios guardados",
      text: "Debe cerrar sesion para ver los cambios en su cuenta",
      icon: "success",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: "Cerrar sesion",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isDenied) {
        history.push("/account/me");
        return;
      } else {
        handleLogout();
      }
    });
  };

  //este handle setea el modal para editar la info, y cambia el nombre
  //de algunos tipos de datos para que resulten mas "amigables"
  const handleShow = function (name) {
    console.log(name);
    setShow(true);

    switch (name) {
      case "givenName":
        setInfoType([name, "nombre"]);
        break;
      case "familyName":
        setInfoType([name, "apellido"]);
        break;
      case "username":
        setInfoType([name, "nombre de usuario"]);
        break;
      case "email":
        setInfoType([name, "email"]);
        break;
      case "password":
        setInfoType(["password", "contraseña"]);
    }
  };

  const handleClose = function () {
    setShow(false);
  };

  const passwordHandleChange = function (e) {
    setPassword(e.target.value);
    setVerifyPassword(true);
  };

  //handle para cerrar sesion
  const handleLogout = async () => {
    //mandar llamar las action de user action
    dispatch(clearCarrito());
    const logoutUser = async () => dispatch(logoutAction());
    await logoutUser();

    //vaciar local storage
    await window.localStorage.clear();
    return;
  };

  const passwordHandleSubmit = function () {
    console.log(verifyPassword);
    if (verifyPassword === true) {
      dispatch(resetPassword(password, authUser.id));
      Swal.fire({
        title: "Nueva contraseña creada",
        text: "Su contraseña ha sido actualizada. Se cerrará su sesion",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogout();
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Ha habido un error. Ingrese los campos correctamente",
      });
    }
  };

  const [file, setFile] = useState("");
  const [ImgUrl, setImgUrl] = useState(
    "http://localhost:3001/img/producto-sin-foto.jpg"
  );

  const imageHandler = async (e) => {
    const file = await obtenerFileImg(e);
    await setFile(file);
    console.log(file);
    let reader = new FileReader();
    console.log("reader", reader);
    console.log("reader.result", reader.result);
    if (file) {
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setImgUrl(reader.result);
          console.log("reader dentro if", reader);
          console.log("reader.result dentro del info", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  //Obtener imagen local ddada por el usuario
  const obtenerFileImg = async (e) => {
    console.log("e.target.files", e.target.files);
    return e.target.files[0];
  };

  const imageSubmitHandle = function () {
    const data = new FormData();
    data.append("file", file);
    dispatch(editUserImage(data, authUser.id));
    setphotoURL(verifyImg.newImage);
  };

  return (
    <div>
      <div className={styles.profileAccountSettings}>
        <NavBar />
        <div className="container bootdey">
          <div className="content-page">
            <div className="profile-banner">
              <div className="col-sm-3 avatar-container">
                <img
                  src={authUser.photoURL}
                  className="img-circle profile-avatar"
                  alt="User avatar"
                  style={{ borderRadius: "180px" }}
                />
              </div>
            </div>

            <div className="content" id={styles.contentUserProfile}>
              <div className="row">  
                <div className="col-sm-9" id="userPanelDiv">
                  <div className="widget widget-tabbed">
                    <div className="tab-content">
                      <div
                        className="tab-pane animated active fadeInRight"
                        id="about"
                      >
                        <div className="d-flex justify-content-center">
                          <h5>
                            <strong>Editar Perfil</strong>
                          </h5>
                        </div>
                        <div class="container">
                          <div class="row flex-lg-nowrap">
                            <div class="col">
                              <div class="row">
                                <div class="col mb-3">
                                  <div class="card1">
                                    <div class="card1-body">
                                      <div class="e-profile">
                                        <ul
                                          class="nav nav-tabs"
                                          id={styles.navTabs}
                                        >
                                          <li class="nav-item"></li>
                                        </ul>
                                        <div class="tab-content pt-3">
                                          <div class="tab-pane active">
                                            <form
                                              class={styles.form}
                                              novalidate=""
                                            >
                                              <div class="row">
                                                <div class="col">
                                                  <div class="row">
                                                    {/*   <div class="col"> */}
                                                    <div class="form-group">
                                                      <label>
                                                        Nombre Completo{" "}
                                                        <i
                                                          className="fa fa-pencil"
                                                          style={{
                                                            fontSize: "11px",
                                                            marginLeft: "4px",
                                                          }}
                                                        ></i>
                                                      </label>
                                                      <input
                                                        id={styles.inputs}
                                                        class="form-control"
                                                        type="text"
                                                        name="name"
                                                        value={
                                                          authUser.givenName +
                                                          authUser.familyName
                                                        }
                                                      />
                                                    </div>

                                                    {/* </div> */}
                                                    {/*  <div class="row"> */}

                                                    <div class="col">
                                                      <div class="form-group">
                                                        <label>
                                                          Usuario{" "}
                                                          <i
                                                            className="fa fa-pencil"
                                                            style={{
                                                              fontSize: "11px",
                                                              marginLeft: "4px",
                                                            }}
                                                          ></i>
                                                        </label>
                                                        <input
                                                          id={styles.inputs}
                                                          class="form-control"
                                                          type="text"
                                                          name="username"
                                                          value={
                                                            authUser.username
                                                          }
                                                        />
                                                      </div>

                                                      {/*   </div> */}
                                                    </div>
                                                  </div>
                                                  <div class="row">
                                                    <div class="col-12 mb-3 d-flex justify-content-center">
                                                      <div class="col">
                                                        <div
                                                          class="form-group"
                                                          id={styles.emailForm}
                                                        >
                                                          <label>
                                                            Email{" "}
                                                            <i
                                                              className="fa fa-pencil"
                                                              style={{
                                                                fontSize:
                                                                  "11px",
                                                                marginLeft:
                                                                  "4px",
                                                              }}
                                                            ></i>
                                                          </label>
                                                          <input
                                                            id={styles.inputs}
                                                            class="form-control"
                                                            type="text"
                                                            value={
                                                              authUser.email
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div class="col">
                                                      <div class="form-group">
                                                        <label>
                                                          New Password{" "}
                                                          <i
                                                            className="fa fa-pencil"
                                                            style={{
                                                              fontSize: "11px",
                                                              marginLeft: "4px",
                                                            }}
                                                          ></i>
                                                        </label>
                                                        <input
                                                          id={styles.inputs}
                                                          class="form-control"
                                                          type="password"
                                                          placeholder="••••••"
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="d-flex justify-content-center">
                                                <div
                                                  className={styles.photoInput}
                                                >
                                                  <div class="col-md-5">
                                                    <div class="col-md-5">
                                                      <div
                                                        className={
                                                          styles.editimg
                                                        }
                                                      >
                                                        <form
                                                          onSubmit={
                                                            imageSubmitHandle
                                                          }
                                                        >
                                                          <label
                                                            class="custom-file-upload"
                                                            id={
                                                              styles.customFileUpload
                                                            }
                                                          >
                                                            <img
                                                              src={
                                                                authUser.photoURL
                                                              }
                                                              className={
                                                                styles.img
                                                              }
                                                            />
                                                            <input
                                                              type="file"
                                                              id="file-upload"
                                                              className="form-control form-control-lg"
                                                              onChange={
                                                                imageHandler
                                                              }
                                                              className={
                                                                styles.input
                                                              }
                                                              name="img"
                                                              accept="image/x-png,image/jpeg,image/jpg"
                                                            />
                                                            <i class="fa fa-cloud-upload"></i>{" "}
                                                            Subir imagen
                                                          </label>
                                                          <button
                                                            type="submit"
                                                            className={`${styles.btnChanges} btn btn-success`}
                                                          >
                                                            Cargar
                                                          </button>
                                                        </form>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div class="row">
                                                <div class="col d-flex justify-content-center">
                                                  <button
                                                    class="btn btn-dark"
                                                    type="submit"
                                                    id={styles.btnSaveLoad}
                                                  >
                                                    Guardar Cambios
                                                  </button>
                                                </div>
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*  <div className = {styles.containerDiv}>
		    <div className = {styles.titleDiv}> <i className="fa fa-cogs" aria-hidden="true"></i> Ajustes de privacidad </div>
                <hr/>

            


            <div className={styles.formdiv}>
            <Form onSubmit = {handleSubmit}>

            <div className = {styles.editInfo}>
            <Form.Label className = {styles.labelstyles}> Nombre: </Form.Label> 
            <Form.Control  type="text" name = "givenName" column = "lg" size = "sm" value= {authUser.givenName} readOnly/> 
            <Button onClick = {()=>{handleShow("givenName")}} variant = "link">modificar</Button>            
            </div>

            <div className = {styles.editInfo}> 
            <Form.Label className = {styles.labelstyles}> Apellido: </Form.Label>
	 		<Form.Control  type="text" name = "familyName" column = "sm" size = "sm"  value = {authUser.familyName} readOnly/>
             <Button onClick = {()=>{handleShow("familyName")}} variant = "link">modificar</Button>      
             </div>

             <div className = {styles.editInfo}> 
            <Form.Label className = {styles.labelstyles}> Email: </Form.Label>
	 		<Form.Control type="text" name = "email" column = "sm" size = "sm"  value = {authUser.email} readOnly/>
             <Button onClick = {()=>{handleShow("email")}} variant = "link">modificar</Button>      
             </div>

             <div className = {styles.editInfo}> 
            <Form.Label className = {styles.labelstyles}> Username: </Form.Label>
	 		<Form.Control  type="text" name = "username" column = "sm" size = "sm"  value = {authUser.username} readOnly/>      
             <Button onClick = {()=>{handleShow("username")}} variant = "link">modificar</Button>      
             </div>

             <div className = {styles.editInfo}> 
            <Form.Label className = {styles.labelstyles}> Password: </Form.Label>
	 		<Form.Control  type="text" name = "password" column = "sm" size = "sm"  value = {"****************"} readOnly/>      
             <Button onClick = {()=>{handleShow("password")}}  variant = "link">modificar</Button>      
             </div>
             <div className = {styles.editimg}>
                <div className="custom-file" id = {styles.divCustomFile}>
                    <form onSubmit = {imageSubmitHandle}>
                    <label for="file-upload" className="custom-file-upload" id= {styles.customFileUpload} >
                    <img src="https://img.icons8.com/ios-filled/50/000000/compact-camera.png"/>
                    </label>
                    <input type="file" id = "file-upload" className="form-control form-control-lg" onChange={imageHandler} className={styles.input} 
                     name="img"  accept="image/x-png,image/jpeg,image/jpg"  />
                    <button type="submit" className={`${styles.btnChange} btn btn-success`}>Cargar</button>
                    </form>
                </div>
        </div>
            </Form>
             </div>   
            </div>
               
           
            <Modal show={show} onhide = {handleClose} infoType = {infoType}>

            {infoType[0] === "password" ? 
                        (<Fragment>
                         <Modal.Header className = {styles.modal}>
                         <Modal.Title>Modificar {infoType[1]}</Modal.Title>
                        </Modal.Header>
                
                        <Modal.Body className = {styles.modal}>
                        <Form>
                        <Form.Label className = {styles.labelstyles}> Ingrese la nueva contraseña: </Form.Label>
                        <Form.Control type="password" name = {infoType[0]} column = "sm" size = "sm"
                        onChange = {passwordHandleChange} placeholder = {password} value = {authUser.infoType}/>
                        </Form>
                        </Modal.Body>
                        <Button variant="primary" type = "submit" onClick={passwordHandleSubmit}>Guardar contraseña</Button>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        </Fragment> 
                        
                        ) : (

                        <Fragment>
                        <Modal.Header className = {styles.modal}>
                        <Modal.Title>Modificar {infoType[1]}</Modal.Title>
                        </Modal.Header>
                
                        <Modal.Body className = {styles.modal}>
                        <Form>
                        <Form.Label className = {styles.labelstyles}> Nuevo {infoType[1]}: </Form.Label>
                        <Form.Control type="text" name = {infoType[0]} column = "sm" size = "sm"
                         onChange = {handleChange} placeholder = {password} value = {authUser.infoType}/>
                          </Form>
                        </Modal.Body>
                        <Button variant="primary" type = "submit" onClick={handleSubmit}>Guardar</Button>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            
                         </Fragment>)}
                         </Modal>
 */
}
