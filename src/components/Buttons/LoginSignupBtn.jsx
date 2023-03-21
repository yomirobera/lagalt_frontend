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

 export default LoginSignupBtn;