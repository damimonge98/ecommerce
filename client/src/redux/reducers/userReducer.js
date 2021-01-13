import {
    CREAR_USUARIO,
    EDITAR_FOTO,
    EDITAR_FOTO_EXITO,
    LOGIN_USER,
    LOGOUT_USER
    } from "../types/Users.js";
    
    //cada reducer tiene su propio state
    const initialState = {
        users: [],
        userAUTH:[],
        newImage: null,
        isAuthenticated:false,
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
                    userAUTH:action.payload,
                    token: action.payload.token,
                    isAuthenticated:true
                }
            case LOGOUT_USER:
                return {
                    ...state,
                    userAUTH: action.payload,
                    isAuthenticated:false
                }    
            case EDITAR_FOTO:
                return {
                    ...state,
                    newImage : action.payload
                }
            case EDITAR_FOTO_EXITO:
                return {
                    ...state,
                }
            default:
                return state;
        }
    }
    