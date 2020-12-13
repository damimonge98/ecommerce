import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddCategories from "./components/Admin/Category/AddCategories.jsx";
import ProductCard from './components/ProductCard/Product_Card';
import {Product, filterId} from './components/Product/Product.jsx' ;
import ProductsAdmin from "./components/Admin/Product/ProductsAdmin.jsx";
import ProductsForm from "./components/Admin/Product/ProductosForm.jsx";
import CategoryAdmin from "./components/Admin/Category/CategoryAdmin.jsx";
import Catalogue from "./components/Catalogue/Catalogue.jsx";
import Nav from './components/Nav/Nav.jsx';
import Sidebar from './components/Sidenavbar/Sidebar'
import MusicBar from './components/MusicBar/MusicBar'
import {Provider} from 'react-redux'
import {store} from './redux/categories'

function App() {
  return (
    <Provider store={store}>
  	<BrowserRouter>
    <Sidebar/>
    {/*   <Route path = "/" component = {Nav}/> */}
      <Route exact path='/products/:id' render={({ match }) =>
      <Product id={filterId(match.params.id)} />}/>
      <Route exact path = "/" component = {Catalogue}/>
      <Route exact path = "/admin/products" component = {ProductsAdmin}/>
      <Route exact path = "/admin/products/new" component = {ProductsForm}/> 
      <Route exact path = "/admin/categories/" component = {CategoryAdmin}/> 
      <Route exact path = "/admin/categories/new" component = {AddCategories}/>
      <Route exact path = "/detail" component = {ProductCard}/> 
      <Route exact path = "/musicbar" component = {MusicBar}/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;