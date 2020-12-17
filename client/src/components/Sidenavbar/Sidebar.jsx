import React,{useEffect} from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../redux/categories";
import { getProducts} from "../../redux/actions/productActions";


export default function SideBar(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="sidebar-container">
        <ul className="sidebar-navigation">
          <li className="header">...</li>
          <li onClick={() => dispatch(getProducts())}>
            <Link to={`/`}>
              <i className="fa fa-home" aria-hidden="true"></i> Home
            </Link>
          </li>
          <li>
            <Dropdown className="nav-dropdown">
              <Dropdown.Toggle variant="" className="dropdown-basic">
                <i className="fa fa-headphones-alt" aria-hidden="true" /> Categories
              </Dropdown.Toggle>
              <Dropdown.Menu className="nav-dropdown-list">
                <Dropdown.Item onClick={() => dispatch(select("pop"))}>
                  Pop
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(select("rock"))}>
                  Rock
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(select("Salsa"))}>
                  Salsa
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(select("cumbia"))}>
                  Cumbia
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(select("rap"))}>
                  Rap
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(select("trap"))}>
                  Trap
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Link to={`/`}>
              <i className="fa fa-user" aria-hidden="true"></i> Log In
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i> Shopping
              Cart
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <i className="fa fa-ticket-alt" aria-hidden="true"></i> Concerts
            </Link>
          </li>
          <li>
            <Link to={`/admin`}>
              <i className="fa fa-user-cog" aria-hidden="true"></i> Admin
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <i className="fa fa-info-circle" aria-hidden="true"></i> Information
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
