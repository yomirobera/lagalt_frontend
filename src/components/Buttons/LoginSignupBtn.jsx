import { Button,Space,AudioOutlined } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import keycloak from "../keycloak/keycloak";

/* const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
); */
const LoginSignupBtn = () => (
  <Space className="site-button-ghost-wrapper" wrap>
   {!keycloak.authenticated && (
                 <>
                    <Button className='btnLogin'  type="primary" ghost onClick={() => keycloak.login()}>
                        LOG INN
                    </Button>

                    <Button className='btnSignup' type="primary" ghost onClick={() => keycloak.register()}>
                        NY BRUKER
                    </Button>
                  </>)}</Space>)
/* const LoginSignupBtn = () => {
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
    
  ); */
 export default LoginSignupBtn;