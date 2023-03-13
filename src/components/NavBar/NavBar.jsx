//Libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png"
//Components
import SearchBar from "../Search/SearchBar";
import LoginSignupBtn from "../Buttons/LoginSignupBtn";
const NavBar = ()=>{

  //Hooks
  const navigate = useNavigate();
  //Render function
  
  return (
    <div className="navBar">
      <div className="navLogo">
        <img src={logo} alt="Logo" className="logo" style={{width:'20%', height:'4%'}}onClick={() => navigate('/')}/>
        <h2><span className="logoText">L</span>agalt</h2>
      </div>
      <SearchBar/>
      <LoginSignupBtn/>
    </div>
 
  )
}

export default NavBar;