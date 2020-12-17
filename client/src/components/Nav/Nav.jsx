import React, {useState} from 'react';
import "./Nav.css"
import SearchArtist from "../../redux/actions/searchActions.js"
import { connect } from "react-redux";
function SearchBar(props) {

  const [data, setData] = useState({
    name: ""
  });
   const handleChange=(event)=> {
    setData({ name: event.target.value });
  }
   const handleSubmit=(event)=> {
    var name2= data.name.split(" ");
    for (let i = 0; i < name2.length; i++) {
        name2[i] = name2[i][0].toUpperCase() + name2[i].substr(1)
    }
    var name3=  name2.join(" ")
    
    event.preventDefault();
    props.SearchArtist(encodeURIComponent(name3));
  }

  return( 
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src="https://bit.ly/37jca0M" alt="" width="48" height="48" class="d-inline-block align-top" />
          Henryfy
        </a>
        <form className="d-flex" onSubmit={(event)=>handleSubmit(event)}>
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(event)=>handleChange(event)}
          value={data.name} />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
};

function mapDispatchToProps(dispatch) {
  return {
    SearchArtist: name => dispatch(SearchArtist(name)),
  };
}


export default connect(null,mapDispatchToProps)(SearchBar);