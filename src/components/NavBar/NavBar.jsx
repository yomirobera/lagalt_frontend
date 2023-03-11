import { NavLink } from "react-router-dom"
import keycloak from "../keycloak/keycloak";
import { Button } from 'antd';

const NavBar = () => {

    //Hide the navigation if user is not logged in
    // const { user } = useUser()

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                {!keycloak.authenticated && (
                 <>
                    <Button type="primary" onClick={() => keycloak.login()}>
                        Login
                    </Button>
                    <Button type="primary" onClick={() => keycloak.register()}>
                        Register
                    </Button>
                </>
                    )}
                </li>
                
                <li>
                    <NavLink to="/Profile">Profile</NavLink>
                </li>               
            </ul>
            {keycloak.authenticated && (
            <ul>
              <li>
                <Button onClick={() => keycloak.logout()}>Logout</Button>
              </li>
            </ul>
          )}
        </nav>
    )
}

export default NavBar