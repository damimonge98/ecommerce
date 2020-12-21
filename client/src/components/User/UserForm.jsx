import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './UserForm.css'
import { connect } from "react-redux";
import CreateUser from "../../redux/actions/userActions"


export function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = 'User name is required';
  } else if (!/\S/.test(input.username)) {
    errors.username = 'Username is invalid';
  }

if(!input.password){
  errors.password = 'Password is required'
} else if (!/(?=.*[0-9])/.test(input.password)){
  errors.password = 'Password is invalid'
}
if(!input.email){
  errors.email = 'email is required'
} else if (!/\S+@\S+\.\S+/.test(input.email)){
  errors.email = 'Email is invalid'
}
  return errors;
};


 const UserForm =(props) =>{
   const [errors, setErrors]=useState({})
   const [imgURL, setImgURl]= useState("")
   const [file, setFile]=useState("")
  const [data, setData] = useState({
    username: "",
      givenName:"",
        familyName: "",
         email: "",
          password:"",
            photoURL:"",
  });

  const handleChange=(event)=> {
    setErrors(validate({...data,[event.target.name]: event.target.value}));
    setData({...data,[event.target.name]: event.target.value});
  }

  const  handleSubmit= (event)=> {
    event.preventDefault();
    /* usuarioData.append('photoURL',data.photoURL) */
    props.CreateUser(file,data);
  }

  const obtenerFileImg = async(e)=>{
    return e.target.files[0]
  }

  const handleimage = async (e)=>{
    const file = await obtenerFileImg(e)
    
    await setFile(file)
    let reader = new FileReader()
    if(file){
      reader.onload = (e)=>{
          if(reader.readyState === 2){
              setImgURl(reader.result)
          }
      }
          reader.readAsDataURL(file)
  }

  }
    return(
        <div className="container-main">
            <Form onSubmit={handleSubmit}>
              <legend>REGISTRATE</legend>
  <Form.Group controlId="formBasicEmail">
  <Form.Label>Nombre de usuario</Form.Label>
  <Form.Control name="username"  value={data.username} onChange={handleChange} type="text" placeholder="nombre de usuario" />
  {errors.username && (
      <p className="danger">{errors.username}</p>
    )}
  <Form.Label>Nombre</Form.Label>
  <Form.Control required  name="givenName" value={data.givenName} onChange={handleChange} type="text" placeholder="Nombre completo" />
  {errors.username && (
      <p className="danger">{errors.givenName}</p>
    )}
  <Form.Label>Apellido</Form.Label>
  <Form.Control name="familyName" value={data.familyName} onChange={handleChange} type="text" placeholder="Apellido" />
  {errors.username && (
      <p className="danger">{errors.familyName}</p>
    )}
    <Form.Label>Email address</Form.Label>
    <Form.Control  name="email" value={data.email} onChange={handleChange} type="email" placeholder="Enter email" />
    {errors.username && (
      <p className="danger">{errors.email}</p>
    )}
    <Form.Label>imagen de perfil</Form.Label>
    <br></br>
    <Form.Control name="photoURL" value={data.photoURL}  onChange={handleimage} type="file"/>
    <br></br>
    <Form.Text className="text-muted">
      jamas compartiremos tu información
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" value={data.password} onChange={handleChange} type="password" placeholder="Password" />
    {errors.username && (
      <p className="danger">{errors.password}</p>
    )}
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </div>
    )
}
function mapDispatchToProps(dispatch) {
  return {
    CreateUser: (file,data) => dispatch(CreateUser(file,data)),
  };
}

export default connect(null,mapDispatchToProps)(UserForm);