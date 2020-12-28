import { 
    AGREGAR_ORDEN,
    AGREGAR_ORDEN_EXITO,
    DESCARGA_ORDEN,
    DESCARGA_ORDEN_EXITO,
    DESCARGA_ORDEN_ERROR,
    ELIMINAR_ORDEN,
    ELIMINAR_ORDEN_EXITO,
    EDITAR_ORDEN,
    EDITAR_ORDEN_EXITO
   } from "../types/orders.js";
  import clienteAxios from '../../config/axios.js';

  export function addOrder(data) { //recibe la data pasada por el form de Addorders
    return function (dispatch) {
      console.log("data", data)
      //se le pasa por body a la url para añadir la Orden
      return clienteAxios.post('/orders/', { name: data.name, description: data.description })
        .then(res => {
          dispatch (agregarOrden(res.data))
          dispatch(agregarOrdenExito())
        })
    }
  };
  
  const agregarOrden = order => ({
    type: AGREGAR_ORDEN,
    payload: order
  });
  
  const agregarOrdenExito = order => ({
    type: AGREGAR_ORDEN_EXITO,
  });
  
  export function getOrder() {
    return async function (dispatch) {
      dispatch(descargarOrden())
      try {
        const respuesta = await clienteAxios.get('/orders/');
        dispatch(descargaOrdenExito(respuesta.data)) // si el get fue exitoso, se hace un dispatch al store de los productos que entran en el array del initialState 'productos', es un array vacío
      } catch (err) {
        console.log(err)
        dispatch(descargaOrdenError())
      }
    }
  }
  
  const descargarOrden = () => ({
    type: DESCARGA_ORDEN,
    payload: true
  });
  
  const descargaOrdenExito = orden => ({
    type: DESCARGA_ORDEN_EXITO,
    payload: orden
  })
  const descargaOrdenError = () => ({
    type: DESCARGA_ORDEN_ERROR,
    payload: true
  });
  
  
  export function deleteOrder(id) {
    return function (dispatch) {
      console.log("id", id)
      dispatch (eliminarOrden(id))
      //se le pasa por body a la url para añadir la Orden
      return clienteAxios.delete('/orders/' + id)
        .then(res => {
          console.log(res.data)
          dispatch(eliminarOrdenExito())
        })
        .catch (err =>{
          console.log(err)
        })
    }
  };
  
  const eliminarOrden = (id) => ({
    type: ELIMINAR_ORDEN,
    payload: id
  })
  
  const eliminarOrdenExito = () => ({
    type: ELIMINAR_ORDEN_EXITO
  
  })
  
  export function editOrder (id, data) {
    return function (dispatch) {
      dispatch (editarOrden({id: id, name: data.name, description: data.description}))
      return clienteAxios.put ("/orders/" +id, {name: data.name, description: data.description})
      .then (res => {
        console.log(res.data)
        dispatch (editarOrdenExito())
      })
       .catch (err =>{
          console.log(err)
        })
    }
  }
  
  const editarOrden = (data) => ({
    type: EDITAR_ORDEN,
    payload: data});
  
  const editarOrdenExito = () => ({
    type: EDITAR_ORDEN_EXITO})