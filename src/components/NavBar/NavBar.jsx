//Libraries
import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../../assets/img/logo.png"
//Components
import SearchBar from "../Search/SearchBar";
import LoginSignupBtn from "../Buttons/LoginSignupBtn";
import keycloak from "../keycloak/keycloak";
import { Button } from 'antd';
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
      <nav>
            <ul>
                {keycloak.authenticated && (
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                )}
              
                {keycloak.authenticated && (
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                )}
           
                </ul>
                
                {keycloak.authenticated && (
                
                <Button danger onClick={() => {
                    keycloak.logout();
                    navigate("/");
                }}>Logout </Button>
        
             
          )}
        </nav>
    </div>
 
  )
}

export default NavBar;