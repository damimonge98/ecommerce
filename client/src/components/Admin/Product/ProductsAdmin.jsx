import React from 'react';
import styles  from './productsAdmin.module.css';  
import { Link } from "react-router-dom";
//import Producto from './ProductAdmin';

const ProductsAdmin = () => {

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
                    <table className="table table-dark"  >
                        <thead  className={styles.tableahead}>
                            <tr>
                            <th scope="col" className="text-center my-5">Imagen</th>
                            <th scope="col" className="text-center my-5">Nombre</th>
                            <th scope="col" className="text-center my-5">Precio</th>
                            <th scope="col" className="text-center my-5">Stock</th>
                            <th scope="col" className="text-center my-5">Categoria</th>
                            <th scope="col" className="text-center my-5">Descripción</th>
                            <th scope="col" className="text-center my-5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center my-5">Album</td>
                                <td className="text-center my-5">Guns N' Roses</td>
                                <td className="text-center my-5">$ 1000</td>
                                <td className="text-center my-5">20</td>
                                <td className="text-center my-5">Rock / grunch</td>
                                <td className="text-center my-5">Apetite for destruction</td>
                                <td className="text-center acciones">
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
                            <tr>
                                <td className="text-center my-5">Album</td>
                                <td className="text-center my-5">Motley Crue</td>
                                <td className="text-center my-5">$ 800</td>
                                <td className="text-center my-5">30</td>
                                <td className="text-center my-5">Rock / balada</td>
                                <td className="text-center my-5">Dr. feelgood</td>
                                <td className="text-center acciones">
                                    <button 
                                        type="button"
                                    
                                        className="btn btn-primary m-1"
                                    >Editar</button>
                                    <button
                                    type="button"
                                    className="btn btn-danger m-1"
                                
                                    >Eliminar</button>
                                </td> 
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductsAdmin;