import { Navigate } from "react-router-dom";
import keycloak from "../components/keycloak/keycloak";

//Define a higher-order component that takes a component and props as agruments
const withAuth = Component => props => {
    if(keycloak.authenticated){ //check if user is authenticated with keycloak
        return <Component {...props}/>
    }else{
        return <Navigate to="/"/>
    }
}
export default withAuth;