import {
    AGREGAR_CATEGORIA,
    DESCARGA_CATEGORIA,
    DESCARGA_CATEGORIA_EXITO,
    DESCARGA_CATEGORIA_ERROR
} from "../types/categories.js";

//cada reducer tiene su propio state
const initialState = {
    categorias: [],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DESCARGA_CATEGORIA:
        case AGREGAR_CATEGORIA:
            return {
                ...state,
                categorias: action.payload
            }
        case DESCARGA_CATEGORIA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_CATEGORIA_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                categorias: action.payload
            }
        default:
            return state;
    }
}
