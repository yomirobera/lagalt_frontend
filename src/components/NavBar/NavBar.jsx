import { NavLink } from "react-router-dom"

const NavBar = () => {

    //Hide the navigation if user is not logged in
    // const { user } = useUser()

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/Login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/Profile">Profile</NavLink>
                </li>
               
            </ul>
            
        </nav>
    )
}

export default NavBar