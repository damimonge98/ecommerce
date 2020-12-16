import {AGREGAR_CATEGORIA} from "../types/categories.js";
import axios from "axios";

export function addCategory(data) { //recibe la data pasada por el form de AddCategories
  return function(dispatch) {
    console.log("data", data)
    //se le pasa por body a la url para añadir la categoria
    return axios.post('http://localhost:3001/categories/',{name: data.name, description: data.description })
                .then(res => {
                  console.log(res.data)
                  dispatch({type: AGREGAR_CATEGORIA, payload: res.data})
                })
  }
};
