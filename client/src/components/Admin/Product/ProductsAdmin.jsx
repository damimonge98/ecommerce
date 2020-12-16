import React,{useState,useEffect} from 'react';
import styles  from './productsAdmin.module.css';  
import { Link } from "react-router-dom";
import Pagination from '../../Pagination/Pagination'
//import data from '../../../data/products.json';
//redux
import {useSelector,useDispatch} from 'react-redux'
//actions
import {obtenerProductosAction} from '../../../redux/actions/productActions';  


const ProductsAdmin = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        //consultar la base de datos 
        const cargarProductos = ()=> dispatch(obtenerProductosAction());
        cargarProductos()
        
    },[])

    //obtener el state
    const data = useSelector(state =>state.products.productos);

    //constantes para la paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(10);
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = data.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const paginate = (pageNum) => setCurrentPage(pageNum);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

        console.log('data')
        console.log(data)
        console.log('currentProducts')
        console.log(currentProducts)

    return (
        <div className={styles.productos}>
            <div className={styles.title}>
                <h2 >Lista de Productos</h2>
            </div>
            <div className={styles.btnDiv}>
                <Link to={"/admin/products/new"}
                    className="btn btn-info nuevo-post d-block d-md-inline-block"
                >Agregar Producto &#43;
                </Link>
            </div>
            <div className={styles.containerTable}> 
                <div className={styles.table}>
                    <table className="table table-dark">
                        <thead  className={styles.tableahead}>
                            <tr>
                                <th scope="col"  className={styles.columnImg}>Imagen</th>
                                <th scope="col"  className={styles.columnas}>Nombre</th>
                                <th scope="col"  className={styles.columnas}>Precio</th>
                                <th scope="col"  className={styles.columnas}>Stock</th>
                                <th scope="col"  className={styles.columnas}>Categoria</th>
                                <th scope="col"  className={styles.columnas}>Descripción</th>
                                <th scope="col"  className={styles.columnas}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.length === 0 ?'No hay productos':currentProducts.map(item => (
                                <tr key={item.id}>
                                    <td className={styles.columnImg}>
                                        <div  className={styles.imgContainer} >
                                            <div className={styles.imgItem}>
                                                <img src={item.img}  className={styles.imgProduct}/>
                                            </div>
                                        </div> 
                                    </td>
                                    <td className={styles.columnas}>{item.name}</td>
                                    <td className={styles.columnas}> $ {item.price}</td>
                                    <td className={styles.columnas}>{item.stock}</td>
                                    <td className={styles.columnas}>{item.category}</td>
                                    <td className={styles.columnas}>{item.description}</td>
                                    <td className={styles.columnas}>
                                        <button 
                                            type="button"
                                            className="btn btn-primary m-1 "
                                        >Editar</button>
                                        <button
                                        type="button"
                                        className="btn btn-danger m-1"

                                        >Eliminar</button>
                                    </td> 
                                </tr>
                            ))}
                           
                        </tbody>
                    </table>
               
                    <Pagination
                productPerPage={productPerPage}
                totalproduct={data.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
                currentPage={currentPage}
              />
                </div>
            </div>
        </div>
    );
}

export default ProductsAdmin;