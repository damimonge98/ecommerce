import { combineReducers } from "redux";
import productosReducer from "./productsReducer";
import categoriesReducer from "./categoriesReducer";


export default combineReducers({
    products: productosReducer,
    categories: categoriesReducer,
    
});
