import React from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
export const Admin = () => {
  return (
    <div class="mainAdmin">
      <h1 className = 'title'>Options: </h1>
      <div className="buttons">
        <div className="btn-left">
          <Link to={"/admin/products/"}>
            <button className="btn btn-light " id="left-button">
              Productos &#43;
            </button>
          </Link>
        </div>
        <div className="btn-right">
          <Link to={"/admin/categories/"}>
            <button className="btn btn-light " id="right-button">
              Categorías &#43;
            </button>
          </Link>
        </div>
        <div className="btn-center">
          <Link to={"/admin/orders/"}>
            <button className="btn btn-light " id="center-button">
              Ordenes &#43;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
