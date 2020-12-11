import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddCategories from "./components/AddCategories/AddCategories.jsx";
import ProductCard from './components/ProductCard/Product_Card'
import {Product, filterId} from './components/Product/Product.jsx' 
import ProductsAdmin from "./components/Admin/Product/ProductsAdmin.jsx"
import ProductsForm from "./components/Admin/Product/ProductosForm.jsx"
import Catalogue from "./components/Catalogue/Catalogue.jsx"
import Nav from './components/Nav/Nav.jsx';

function App() {
  return (
  	<BrowserRouter>
      <Route path = "/" component = {Nav}/>
      <Route exact path = "/" component = {ProductCard}/>
      <Route exact path='/products/:id' render={({ match }) =>
      <Product id={filterId(match.params.id)} />}/>
      <Route exact path = "/catalogue" component = {Catalogue}/>
      <Route exact path = "/admin/products" component = {ProductsAdmin}/>
      <Route exact path = "/admin/products/new" component = {ProductsForm}/> 
    </BrowserRouter>
  );
}

export default App;