import {
CREAR_USUARIO
} from "../types/Users.js";

//cada reducer tiene su propio state
const initialState = {
    users: [],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREAR_USUARIO:
            return {
                ...state,
                categorias: action.payload
            }
        default:
            return state;
    }
}
