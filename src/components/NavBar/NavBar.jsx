import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import keycloak from "../keycloak/keycloak";
// Components
import SearchBar from "../Search/SearchBar";
import LoginSignupBtn from "../Buttons/LoginSignupBtn";

const { SubMenu } = Menu;

const NavBar = () => {
  const navigate = useNavigate();

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
      <LoginSignupBtn />

      <Menu mode="horizontal" className="navMenu" theme="light">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        {keycloak.authenticated && (
          <Menu.Item key="create" icon={<PlusOutlined />}>
            <NavLink to="/CreateProject">New project</NavLink>
          </Menu.Item>
        )}

        {keycloak.authenticated && (
          <SubMenu key="SubMenu" icon={<UserOutlined />} title="Profile">
            <Menu.Item key="profile">
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
            
            <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={() => {
              keycloak.logout();
              navigate("/");
            }}>
              Logout
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </div>
  );
};

export default NavBar;