import { Button } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import keycloak from "../keycloak/keycloak";

import '../../css/LoginButton.css'


const LoginSignupBtn = () => {
  return (
    <div>
      {!keycloak.authenticated && (
        <Button className="btnFunction" icon={<LoginOutlined />} 
          onClick={() => keycloak.login()}>
          Login
        </Button>
      )}

      {!keycloak.authenticated && (
        <Button className="btnFunction" icon={<UserAddOutlined />} 
          onClick={() => keycloak.register()}>
          Signup
        </Button>
      )}
    </div>
    
  );
}; export default LoginSignupBtn;