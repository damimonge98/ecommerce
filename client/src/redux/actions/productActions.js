import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types/products';
import clienteAxios from '../../config/axios.js';


 // Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/products');
            dispatch( descargaProductosExitosa(respuesta.data) )
        } catch (error) {
            console.log(error);
            dispatch( descargaProductosError() )
        }
    }
}

export function getProducts() {
  return async function(dispatch) {
    try {
    const respuesta = await clienteAxios.get('/products');
    dispatch(descargaProductosExitosa(respuesta.data)) // si el get fue exitoso, se hace un dispatch al store de los productos que entran en el array del initialState 'productos', es un array vacío
    } catch(err) {
      console.log(err)
      dispatch(descargaProductosError())
    }
  }
}

export function getProductId(id) {
  return async function(dispatch) {
    dispatch(descargarProductos())
    try {
    const respuesta = await clienteAxios.get(`/products/${id}`);
    dispatch(descargaProductosExitosa(respuesta.data)) 
    } catch(err) {
      console.log(err)
      dispatch(descargaProductosError())
    }
  }
}


const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR, 
    payload: true
});
