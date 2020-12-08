import React from 'react';
import './App.css';

import AddCategories from "./components/AddCategories.js";
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (


  	<BrowserRouter>
  	<Route exact path = "/" component = {AddCategories}/>
    </BrowserRouter>
  );
}

export default App;
