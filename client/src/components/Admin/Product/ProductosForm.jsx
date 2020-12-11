import React,{Fragment, useState} from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import styles  from './productos-form.module.css';  



const ProductosForm = () => {
    //sestilos del select
    const style = {
        chips: {
        background: "#29c1eb"
        },
        searchBox: {
            backgroundColor:"white",
            
        },
            multiselectContainer: {
            color: "black"
        }
    };
    const categoriesData =[
        {genero: 'Rock',id:1},
        {genero: 'Reggae',id:1},
        {genero: 'Salsa',id:1},
        {genero: 'Cumbia',id:1},
        {genero: 'Merengue',id:1}
    ]
    
    //Estado del select de categorias
    const [options] = useState(categoriesData); 
    //Estado de el input de imagen
    const [productImg, setproductImg] = useState({img:'http://www.higieneplus.com.ar/wp-content/themes/higieneplus/images/producto-sin-foto.jpg'});
    //estado de values de inputs
    const [inputs, setInputs] = useState({});

    const {img} = productImg

    //manejador de imagen obtenida en el input
    const imageHandler = (e)=>{
        const file=e.target.files[0];
        let reader = new FileReader();

        if(file){
            reader.onload = (e)=>{
                if(reader.readyState === 2){
                    setproductImg({img:reader.result})
                
                }
            }
            reader.readAsDataURL(file)
        }
    }

    //manejar values de inputs
    const handleInputChange = (e)=> {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }
   // style={{width:"100%",border:"red 5px solid"}}
    return (
        <div >
            <div className="d-flex justify-content-center mt-5">
                <div xs={12} style={{marginTop:"20px"}} >
                    <h2>Formulario productos crud</h2>
                    <div class="mt-5" >
                        <form style={{width:"100%"}}>
                            <div class="mb-3">
                                <label for="nombre" className="form-label">Nombre: *</label>
                                <input type="text" className="form-control" id="nombre" placeholder="Producto" name="name" onChange={handleInputChange}/>
                            </div>
                            <div class="mb-3">
                                <label for="stock" className="form-label">Stock: *</label>
                                <input type="text" className="form-control" id="stock" placeholder="Stock" name="stock"  onChange={handleInputChange}/>
                            </div>
                            <div class="mb-3">
                                <label for="precio" className="form-label">Precio: *</label>
                                <input type="text" className="form-control" id="precio" placeholder="Precio"  name="precio" onChange={handleInputChange}/>
                            </div>
                            <div>
                                <label for="precio" className="form-label">Categoria: *</label>
                                <Multiselect
                                    options={options} // Options to display in the dropdown
                                    displayValue="genero" // Property name to display in the dropdown options
                                    style={style}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mt-3">
                                <label for="precio" className="form-label">Descripción: *</label>
                                <div class="form-floating">
                                    <textarea className="form-control"  id="descripcion" style={{height:"100px"}} onChange={handleInputChange}></textarea>
                                </div>
                            </div>
                            <div>
                                <div >
                                    <h6 className={styles.heading}>Agrega una imagen: </h6>
                                    <div className={styles.imgHolder}>
                                        <img src={img} id="" alt="" className={styles.img}/>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label for="imagen" class="form-label"></label>
                                    <input type="file" className="form-control form-control-lg" className={styles.input} name="imagen"  accept="image/x-png,image/jpeg,image/jpg" onChange={imageHandler}/>
                                </div>
                            </div>
                            <br />
                            <div className={styles.btnForm} className="d-grid gap-2 col-6 mx-auto">
                                <button variant="success" type="Guardar" style={{marginBottom:"20px"}} >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default ProductosForm;