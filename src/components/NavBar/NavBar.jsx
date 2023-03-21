import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  PlusOutlined,
  EditOutlined,

} from "@ant-design/icons";
import keycloak from "../keycloak/keycloak";
// Components
import SearchBar from "../Search/SearchBar";
import LoginSignupBtn from "../Buttons/LoginSignupBtn";
import { addUsers, getUser } from "../../api/user";

const { SubMenu } = Menu;

const NavBar = () => {
  const navigate = useNavigate();


  if (keycloak.authenticated && !(getUser(keycloak.tokenParsed.sub))) {
     addUsers();
  } else {
    // do nothing
  }



  return (
    <div className="navBar">
      <div className="navLogo">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          style={{ width: "80%", height: "5%", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
       {/*  <h2>
          <span className="logoText">L</span>agalt
        </h2> */}
      </div>
      <SearchBar />
      <Menu mode="horizontal" className="navMenu" theme="light">
      {keycloak.authenticated && (
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <NavLink to="/">Home</NavLink>
       </Menu.Item>
        )}
        {keycloak.authenticated && (
          <SubMenu key="SubMenu" icon={<UserOutlined />} title="Profile">
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <NavLink to="/Profile">Profile</NavLink>
            </Menu.Item>

            <Menu.Item key="create" icon={<PlusOutlined />}>
              <NavLink to="/CreateProject">New project</NavLink>
            </Menu.Item>

            <Menu.Item key="edit" icon={<EditOutlined />}>
              <NavLink to="/EditProject">Endre project</NavLink>
            </Menu.Item>
          </SubMenu>
        )}
         {keycloak.authenticated && (
            <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={() => {
            keycloak.logout();
            navigate("/");
          }}>
            Logout
          </Menu.Item>
            )}
            
      </Menu>
      <LoginSignupBtn />

    </div>
  );
};

export default NavBar;