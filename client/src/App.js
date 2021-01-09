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
import Order from './components/order/Order';
import Checkout from './components/Checkout/Checkout';
import OrdersDetail from './components/Admin/OrdersDetail/OrdersDetail';
import Login from './components/Login/Login'
import UserOrdersDetail from './components/Admin/UserOrdersDetail/UserOrdersDetail';
import Carousel from './components/Carousel/Carousel';
import AccountSettings from "./components/UserAccount/AccountSettings.jsx";
import UserOrders from "./components/UserAccount/Orders.jsx";
import UserPrivacity from "./components/UserAccount/Privacity.jsx";
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
          <Route path="/" component={SideBarRight}/>
          <Toaster />
          <Route path="/" component={SearchBar} />
          <Route exact path="/login" component={Login} />
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
          <Route exact path="/order" component={Order} />
          <Route exact path="/order/checkout" component={Checkout} />
          <Route exact path="/admin/orders/:id" component={OrdersDetail} />
          <Route exact path="/admin/orders/users/:id" component={UserOrdersDetail} />
          <Route exact path="/" component={Carousel} />
          <Route exact path="/account/me" component={AccountSettings}/>
          <Route exact path="/account/me/orders" component = {UserOrders} />
          <Route exact path = "/account/me/privacity" component = {UserPrivacity} />
        </Context.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

