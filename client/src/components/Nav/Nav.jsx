import React from 'react';
import "./Nav.css"

/* export default function SearchBar(props) {
  // acá va tu código
  return (
    <div className="navSearch">
          <form className="d-flex justify-content-center">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
    </div>)
}; */


export const SearchBar = () => {
  return (
    <div class="main">
      <div class="form-group has-search">
        <span class="fa fa-headphones-alt form-control-feedback"></span>
        <input type="text" class="form-control" placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchBar