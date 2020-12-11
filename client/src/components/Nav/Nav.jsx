import React from 'react';
import "./Nav.css"

export default function SearchBar(props) {
  // acá va tu código
  return (
    <div className="navSearch">
          <form className="d-flex">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
    </div>)
};
