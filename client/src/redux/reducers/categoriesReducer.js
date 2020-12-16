import {
    AGREGAR_CATEGORIA
 } from "../types/categories";


//cada reducer tiene su propio state
const initialState = {
    categorias: [],
    error: null,
    loading:false,
    productoeliminar: null,
    productoeditar:null
}


export default function(state = initialState, action){
    switch(action.type){
        case AGREGAR_CATEGORIA:
            return {
                ...state,
                categorias: action.payload
            }
        default:
            return state;
    }
}
