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
    PRODUCTO_EDITADO_ERROR,
    OBTENER_PRODUCTO
} from '../types/products';
import axios from 'axios';


export function getProducts() {
    return async function(dispatch) {
      dispatch(descargaProductos())
      try {
      const respuesta = await axios.get('http://localhost:3001/products');
      dispatch(descargaProductosExitosa(respuesta.data)) // si el get fue exitoso, se hace un dispatch al store de los productos que entran en el array del initialState 'productos', es un array vacíp
      } catch(err) {
        console.log(err)
        dispatch(descargaProductosError())
      }
    }
  }

  export function getProductId(id) {
    return async function(dispatch) {
      dispatch(descargaProductos())
      try {
      const respuesta = await axios.get('http://localhost:3001/products/' + id);
      dispatch(descargaProductosExitosa(respuesta.data)) // si el get fue exitoso, se hace un dispatch al store de los productos que entran en el array del initialState 'productos', es un array vacíp
      } catch(err) {
        console.log(err)
        dispatch(descargaProductosError())
      }
    }
  }

  const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS, // esta action contiene un booleano seteado en falso, cuando se hace la llamada, el booleano pasa a true
    payload: true
  })

  const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
  })

  const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
  })