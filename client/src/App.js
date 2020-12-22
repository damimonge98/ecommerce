import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AddCategories from "./components/Admin/Category/AddCategories.jsx";
import ProductCard from './components/ProductCard/Product_Card';
import ProductsAdmin from "./components/Admin/Product/ProductsAdmin.jsx";
import ProductsForm from "./components/Admin/Product/ProductosForm.jsx";
import CategoryAdmin from "./components/Admin/Category/CategoryAdmin.jsx";
import Catalogue from "./components/Catalogue/Catalogue.jsx";
import SearchBar from './components/Nav/Nav.jsx';
import Sidebar from './components/Sidenavbar/Sidebar'
import MusicBar from './components/MusicBar/MusicBar'
import { Provider } from 'react-redux'
import store from './redux/store'
import Admin from './components/Admin/Admin2/Admin'
import { Toaster } from './components/toaster/toaster';
import SideBarRight from './components/SideBarRight/SideBarRight'
import Orders from './components/Admin/Orders/Orders'
import UserForm from './components/User/UserForm.jsx'
// el Context es para crear la conexión entre las acciones de Sidebar y el catálogo, para poner conectar el filtrado
export const Context = React.createContext({
  currentCategory: null,
  setCurrentCategory: () => { },
  isRightBarOpen: null,
  setRightBarOpen: () => { }
});

function App() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [isRightBarOpen, setRightBarOpen] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* esto es parte de context, le paso las acciones que quiero conectar y en qué componentes */}
        <Context.Provider value={{ currentCategory, setCurrentCategory, isRightBarOpen, setRightBarOpen }}>
          <Sidebar />
          <Route exact path="/" component={Catalogue} />
          <SideBarRight />
          <Toaster />
          <Route exact path="/" component={SearchBar} />
          <Route exact path="/products/:id" component={ProductCard} />
          <Route exact path="/musicbar" component={MusicBar} />
          <Route exact path="/admin/products" component={ProductsAdmin} />
          <Route exact path="/admin/products/new" component={ProductsForm} />
          <Route exact path="/admin/products/edit/:id" component={ProductsForm} />
          <Route exact path="/admin/categories/" component={CategoryAdmin} />
          <Route exact path="/admin/categories/new" component={AddCategories} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/orders" component={Orders} />
          <Route exact path="/user" component={UserForm} />
        </Context.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

