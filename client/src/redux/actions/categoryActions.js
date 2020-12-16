import { 
  AGREGAR_CATEGORIA,
  DESCARGA_CATEGORIA,
  DESCARGA_CATEGORIA_EXITO,
  DESCARGA_CATEGORIA_ERROR
 } from "../types/categories.js";
import clienteAxios from '../../config/axios.js';

export function addCategory(data) { //recibe la data pasada por el form de AddCategories
  return function (dispatch) {
    console.log("data", data)
    //se le pasa por body a la url para añadir la categoria
    return clienteAxios.post('/categories/', { name: data.name, description: data.description })
      .then(res => {
        console.log(res.data)
        dispatch({ type: AGREGAR_CATEGORIA, payload: res.data })
      })
  }
};

export function getCategories() {
  return async function (dispatch) {
    dispatch(descargarCategorias())
    try {
      const respuesta = await clienteAxios.get('/categories/');
      dispatch(descargaCategoriaExito(respuesta.data)) // si el get fue exitoso, se hace un dispatch al store de los productos que entran en el array del initialState 'productos', es un array vacío
    } catch (err) {
      console.log(err)
      dispatch(descargaCategoriaError())
    }
  }
}

const descargarCategorias = () => ({
  type: DESCARGA_CATEGORIA,
  payload: true
});

const descargaCategoriaExito = productos => ({
  type: DESCARGA_CATEGORIA_EXITO,
  payload: productos
})
const descargaCategoriaError = () => ({
  type: DESCARGA_CATEGORIA_ERROR,
  payload: true
});
