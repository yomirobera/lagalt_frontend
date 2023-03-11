//Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

//Components
import SearchBar from "../Search/SearchBar";
const NavBar = ()=>{

  //Hooks
  const navigate = useNavigate();
  //Render function
  //<img src={Logo} alt="Logo" className="logo" onClick={() => navigate('/')}/>
  
  return (
    <div className="navBar">
          <SearchBar/>
    </div>
 
  )
}

export default NavBar;