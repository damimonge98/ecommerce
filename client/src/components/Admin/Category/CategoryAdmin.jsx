import React ,{useState}from 'react';
import styles  from './categoryAdmin.module.css';  
import { Link } from "react-router-dom";
import Pagination from '../../Pagination/Pagination'
import data from '../../../data/categories.json';


const CategoryAdmin = () => {

    
        //constantes para la paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(10);
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentCategories = data.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const paginate = (pageNum) => setCurrentPage(pageNum);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);


    return (
        <div className={styles.productos}>
            <div className={styles.title}>
                <h2 >Lista de Categorias</h2>
            </div>
            <div className={styles.btnDiv}>
                <Link to={"/admin/categories/new"}
                    className="btn btn-info nuevo-post d-block d-md-inline-block"
                >Agregar Categoria &#43;
                </Link>
            </div>
            <div className={styles.containerTable}> 
                <div className={styles.table}>
                    <table className="table table-dark">
                        <thead  className={styles.tableahead}>
                            <tr>
                                <th scope="col"  className={styles.columnas}>Nombre</th>
                                <th scope="col"  className={styles.columnas}>Descripción</th>
                                <th scope="col"  className={styles.columnas}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategories.length === 0 ?'No hay categorias':currentCategories.map(item => (
                                <tr key={item.id}>
                                    <td className={styles.columnas}>{item.name}</td>
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

export default CategoryAdmin;