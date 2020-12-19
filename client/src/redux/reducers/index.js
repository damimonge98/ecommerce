import { combineReducers } from "redux";
import productosReducer from "./productsReducer";
//import categoriesReducer from "./categoriesReducer";
import { carritoReducer } from "./carritoReducer";
import { toastReducer } from "./toastReducer";

export default combineReducers({
    products: productosReducer,
    carrito: carritoReducer,
    toast: toastReducer
});

