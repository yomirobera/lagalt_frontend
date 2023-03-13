import { NavLink, useNavigate } from "react-router-dom"
import keycloak from "../keycloak/keycloak";
import { Button } from 'antd';

const NavBar = () => {

    const navigate = useNavigate();

    //Hide the navigation if user is not logged in
    // const { user } = useUser()

    return (
        <nav>
            <ul>
                {keycloak.authenticated && (
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                )}
                <li>
                {!keycloak.authenticated && (
                 <>
                    <Button  onClick={() => keycloak.login()}>
                        Login
                    </Button>

                    <Button type="primary" onClick={() => keycloak.register()}>
                        Register
                    </Button>
                </>
                    )}
                </li>
                
                {keycloak.authenticated && (
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                )}
           
                </ul>
                
                {keycloak.authenticated && (
                <ul>
              <li>
                <Button danger onClick={() => {
                    keycloak.logout();
                    navigate("/");
                }}>Logout </Button>
        
              </li>
            </ul>
          )}
        </nav>
    )
}

export default NavBar