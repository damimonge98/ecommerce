import React, { useState,useEffect } from "react";
import "./Nav.css";
import SearchArtist from "../../redux/actions/searchActions.js";
import { connect } from "react-redux";
import { Link, Redirect,withRouter } from "react-router-dom";

function SearchBar(props) {
  const {history} = props
  const [data, setData] = useState({
    name: "",
  });
  let acumulador = 0;
  const handleChange = (event) => {
    setData({ name: event.target.value });
  };
  const  handleSubmit = (event) => {
     history.push('/')
    var name2 = data.name.split(" ");
    for (let i = 0; i < name2.length; i++) {
      name2[i] = name2[i][0].toUpperCase() + name2[i].substr(1);
    }
    var name3 = name2.join(" ");
    event.preventDefault();
    props.SearchArtist(encodeURIComponent(name3));
    while(acumulador < 1){
      setTimeout(() => { 
        handleSubmit(event) }, 0)
        acumulador++
      }
  }

  
  return (
    <nav className="navbar navbar-custom">
      <div className="container-fluid">
        <form className="d-flex"/* onSubmit={(event) => handleSubmit(event)} */>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => handleChange(event)}
            value={data.name}
            id="input-search"/>
          <div className = 'icon-div'>
          <i className="fa fa-search" id="icon-search"    onClick={handleSubmit}></i>
          </div>
        </form>
      </div>
    </nav>
  );
  }

function mapDispatchToProps(dispatch) {
  return {
    SearchArtist: (name) => dispatch(SearchArtist(name)),
  };
}

export default connect(null, mapDispatchToProps)(SearchBar);
