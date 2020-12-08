import React from 'react';
import './App.css';
import AddCategories from "./components/AddCategories/AddCategories.jsx";
import ProductCard from './components/ProductCard/Product_Card'
import Catalogue from "./components/Catalogue/Catalogue.jsx"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav.jsx';

function App() {
  return (
  	<BrowserRouter>
    <Route exact path = "/" component = {Nav}/>
  	<Route exact path = "/catalogue" component = {Catalogue}/>
    </BrowserRouter>

  );
}

export default App;
