import React, { Fragment, useContext, useEffect } from "react";
import "./Sidebar.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getCategoriesName,
} from "../../redux/actions/categoryActions";
import { getProducts } from "../../redux/actions/productActions";
import { Context } from "../../App";
import Collapse from "react-bootstrap/Collapse";

export default function SideBar() {
  //este es el set de la acción que se va a modificar en catálogo
  const {
    currentCategory,
    setCurrentCategory,
    setRightBarOpen,
    isRightBarOpen,
  } = useContext(Context);
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categorias);
  const productos = useSelector((state) => state.carrito.products);
  const shoppingCount = productos.reduce(
    (prev, curr) => (prev ?? 0) + curr.cantidad,
    0
  );

  // este handleClick es para que al hacer click al carrito se abra y se cierre
  const handleClick = () => {
    if (currentCategory === "All" && isRightBarOpen === false) {
      setRightBarOpen(true);
    } else if (currentCategory === "Outside") {
      history.push("/order");
    } else {
      setRightBarOpen(false);
    }
  };

  const handleCategory = () => {
    setCurrentCategory("Outside");
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userAuthenticated = useSelector((state) => state.user.userAUTH);

  return (
    <div className="parent-bar">
      <div className="sidebar-container">
        <ul className="sidebar-navigation">
          <li className="header">
            <Link to={`/`} onClick={() => dispatch(getProducts())}>
              <img
                src="https://bit.ly/37jca0M"
                onClick={() => dispatch(getProducts())}
                alt=""
                style={{ backgroundColor: "transparent" }}
                width="38"
                height="38"
                class="d-inline-block align-top"
              />
            </Link>
          </li>
          {/* este boton lleva a home y setea la categoría a All, si la categoría es "All", todos los productos se muestran */}
          <li onClick={() => setCurrentCategory("All")}>
            {/* este dispatch de getProducts es porque cuando busco un nombre en la Searchbar y doy en Home se tiene que renderizar todo de nuevo */}
            <Link to={`/`} onClick={() => dispatch(getProducts())}>
              <i className="fa fa-home" aria-hidden="true"></i> Home
            </Link>
          </li>
          <li>
            {/* este onClick a getCategories es para que siempre me imprima los nombres de las categorías al renderizar el dropdown */}
            <Dropdown
              className="nav-dropdown"
              onClick={() => dispatch(getCategories())}
            >
              <Dropdown.Toggle variant="" className="dropdown-basic">
                <i className="fa fa-headphones-alt" aria-hidden="true" />{" "}
                Categories
              </Dropdown.Toggle>
              <Dropdown.Menu className="nav-dropdown-list">
                {Array.isArray(categories) &&
                  categories.map((category) => {
                    return (
                      // aquí seteo el currentCategory con el nombre al que se le haga click en la lista
                      <Dropdown.Item
                        onClick={() => setCurrentCategory(category.name)}
                      >
                        <div key={category.id}>
                          <ul>
                            <li className="list-categories">
                              {/*con este dispatch a categoriesName hago un get al nombre de la categoría que esté en la lista, hace el get a /products/category/:nameCat*/}
                              <p
                                onClick={() =>
                                  dispatch(getCategoriesName(category.name))
                                }
                              >
                                {category.name}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li onClick={handleClick} className="shopping-icon">
            <Link to={`#`}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span className="badge badge-warning" id="lblCartCount">
                {/* si no hay productos, no se va a mostrar el icono de la cuenta de productos */}
                {productos.length > 0 ? shoppingCount : null}
              </span>
              Shopping Cart
            </Link>
          </li>
          <li onClick={handleCategory}>
            <Link to={`/`}>
              <i className="fa fa-ticket-alt" aria-hidden="true"></i> Concerts
            </Link>
          </li>
          {!userAuthenticated ? null : userAuthenticated.isAdmin === "true" ? (
            <li onClick={handleCategory}>
              <Link to={`/admin`}>
                <i className="fa fa-user-cog" aria-hidden="true"></i> Admin
              </Link>
            </li>
          ) : null}
          {!isAuthenticated ? (
            <Fragment>
              <li onClick={handleCategory}>
                <Link to={`/user`}>
                  <i className="fa fa-user" aria-hidden="true"></i> Sign In
                </Link>
              </li>
              <li onClick={handleCategory}>
                <Link to={`/login`}>
                  <i className="fa fa-user" aria-hidden="true"></i> Log In
                </Link>
              </li>
            </Fragment>
          ) : (
            <li onClick={handleCategory}>
              <Dropdown className="nav-dropdown">
                <Dropdown.Toggle variant="" className="dropdown-basic">
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i> My
                  Account
                </Dropdown.Toggle>
                <Dropdown.Menu className="nav-dropdown-list">
                  <Dropdown.Item>
                    <ul>
                      <li
                        className="list-categories"
                        onClick={() => history.push("/account/me")}
                      >
                        {" "}
                        <i
                          class="fa fa-user-circle-o"
                          aria-hidden="true"
                          style={{ marginLeft: "-25px" }}
                        ></i>
                        Mi Perfil
                      </li>
                    </ul>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <ul>
                      <li
                        onClick={() => history.push("/account/me/privacity")}
                        className="list-categories"
                      >
                        <i
                          class="fa fa-user-edit"
                          aria-hidden="true"
                          style={{ marginLeft: "-25px" }}
                        ></i>
                        Editar Perfil
                      </li>
                    </ul>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <ul>
                      <li onClick={() => history.push("/account/me/orders")} className="list-categories">
                        <i
                          class="fa fa-shopping-basket"
                          aria-hidden="true"
                          style={{ marginLeft: "-25px" }}
                        ></i>
                        Mis Compras
                      </li>
                    </ul>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          )}
          <li onClick={handleCategory}>
            <Link to={`/`}>
              <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
              Information
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
