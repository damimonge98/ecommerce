import {
    CREAR_USUARIO,
    LOGIN_USER,
    USER_AUNTENTICADO
    } from "../types/Users.js";
    
    //cada reducer tiene su propio state
    const initialState = {
        users: [],
        userAUTH:[],
        token:"",
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
                case LOGIN_USER:
                    return {
                        ...state,
                        token: action.payload.data
                    }
                case USER_AUNTENTICADO:
                    return {
                        ...state,
                        userAUTH: action.payload
                    }
            default:
                return state;
        }
    }
    