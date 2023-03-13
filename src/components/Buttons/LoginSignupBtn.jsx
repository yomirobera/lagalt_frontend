import { AudioOutlined } from '@ant-design/icons';
import {Button, Space } from 'antd';
import keycloak from "../keycloak/keycloak";

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const LoginSignupBtn = () => (
  <Space className="site-button-ghost-wrapper" wrap>
   {!keycloak.authenticated && (
                 <>
                    <Button className='btnSignup' type="primary" ghost onClick={() => keycloak.login()}>
                        Login
                    </Button>

                    <Button className='btnLogin' type="primary" ghost onClick={() => keycloak.register()}>
                        Register
                    </Button>

                    
                </>
   )}
  </Space> 

  

 );
export default LoginSignupBtn;