import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddCategories from "./components/AddCategories.js";
import AddCategories from "./components/AddCategories/AddCategories.jsx";
import ProductCard from './components/ProductCard/Product_Card'
import Product from './components/Product/Product'


function App() {
  return (
  	<BrowserRouter>
  	<Route exact path = "/" component = {AddCategories}/>
    </BrowserRouter>
  );
}

export default App;
