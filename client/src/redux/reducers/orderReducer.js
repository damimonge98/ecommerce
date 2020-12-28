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

  const initialState = {
    orden: [],
    error: null,
    loading: false,
    ordenagregar: null,
    ordeneliminar: null,
    ordeneditar: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DESCARGA_ORDEN:
        case AGREGAR_ORDEN:
            return {
                ...state,
                ordenagregar: action.payload
            }
        case AGREGAR_ORDEN_EXITO:
            return {
                ...state,
                ordenagregar: null,
                orden: state.orden.concat (state.ordenagregar)
            }
        case DESCARGA_ORDEN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_ORDEN_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                orden: action.payload
            }

        case ELIMINAR_ORDEN:
          return {
            ...state,
            ordeneliminar: action.payload
          }
        case ELIMINAR_ORDEN_EXITO:
        return {
            ...state,
            orden: state.orden.filter(orden => orden.id !== state.ordeneliminar)
          }
        case EDITAR_ORDEN:
        return {
            ...state,
            ordeneditar: action.payload,
            orden: state.orden.filter(orden => orden.id !== action.payload.id)
        }
        case EDITAR_ORDEN_EXITO:
        return {
            ...state,
            orden: state.orden.concat (state.ordeneditar)
        }
        default:
            return state;
    }
}