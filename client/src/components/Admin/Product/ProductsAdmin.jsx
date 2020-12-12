import React from 'react';
import styles  from './productsAdmin.module.css';  
import '../../../hooks/pagination.css';
import { Link } from "react-router-dom";
import usePagination from '../../../hooks/usePagination';
import data from '../../../data/products.json';


const ProductsAdmin = ({itemsPerPage,startFrom}) => {
    const { slicedData, pagination, prevPage, nextPage, changePage } = usePagination({ itemsPerPage, data, startFrom });


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
                            {slicedData.length === 0 ?'No hay productos':slicedData.map(item => (
                                <tr key={item.id}>
                                    <td className={styles.columnImg}>
                                        <div  className={styles.imgContainer} >
                                            <div className={styles.imgItem}>
                                                <img src={item.image} alt="imagen producto" className={styles.imgProduct}/>
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
                    <nav className="pagination">
                        <a href="/#" className="pagination-previous" onClick={prevPage}>Previous</a>
                        <a href="/#" className="pagination-next" onClick={nextPage}>Next</a>
                        <ul className="pagination-list">
                        {pagination.map(page => {
                            if(!page.ellipsis) {
                                return <li key={page.id}>
                                <a 
                                    href="/#"
                                    className={page.current ? 'pagination-link is-current' : 'pagination-link'}
                                    onClick={(e) => changePage(page.id, e)}
                                >
                                    {page.id}
                                </a>
                                </li>
                            }else {
                                return <li key={page.id}><span className="pagination-ellipsis">&hellip;</span></li>
                            }
                        })}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default ProductsAdmin;