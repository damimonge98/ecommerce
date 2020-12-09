import React from 'react';
import './App.css';
import AddCategories from "./components/AddCategories/AddCategories.jsx";
import ProductCard from './components/ProductCard/Product_Card'
import {Product, filterId} from './components/Product/Product' 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav.jsx';

function App() {
  return (
  	<BrowserRouter>
    <Route exact path = "/" component = {Nav}/>
  	<Route exact path = "/" component = {AddCategories}/>
    <Route exact path='/products/:id' render={({ match }) =>
    <Product id={filterId(match.params.id)} />}
    />
    </BrowserRouter>
  );
}

export default App;