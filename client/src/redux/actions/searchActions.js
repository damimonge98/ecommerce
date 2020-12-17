
import {
    DESCARGA_PRODUCTOS_EXITO
} from '../types/products';
import axios from 'axios';

export default function SearchArtist(name) {
    return function(dispatch) {
      return axios.get("http://localhost:3001/search?name=" + name)
        .then(artist => dispatch({ type: DESCARGA_PRODUCTOS_EXITO, payload: artist }));
        
    };
  }