import React from 'react';

export default function SearchBar(props) {
  // acá va tu código
  return (
    <div>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="https://cdn0.iconfinder.com/data/icons/flat-designed-circle-icon/1000/headset.png" alt = "" height="48" weigth="48"/>
            Navbar
          </a>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>)
};
