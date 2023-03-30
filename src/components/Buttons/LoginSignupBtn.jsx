import { Button,Space,AudioOutlined } from "antd";
import { useHistory } from 'react-router-dom';
import keycloak from "../keycloak/keycloak";
// import './../../../src/index.css';
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
                    <Button className='btnLogin'style={{width: '105%',
                                                marginRight: '20px',
                                                color:' #ffff',
                                                backgroundColor: 'hsl(212, 43%, 59%)',
                                                boxSizing: 'border-box',
                                                borderColor: 'rgb(112, 136, 243)'}}  
                                                 type="primary" ghost onClick={() => keycloak.login()}>
                                                                      LOGG INN
                    </Button>

                    <Button className='btnSignup' style={{
                     color: 'hsl(212, 43%, 59%)',
                     backgroundColor:'#ffff',
                     width: '100%',
                     hight:'50%',
                     boxSizing: 'border-box',
                     borderColor: 'rgb(112, 136, 243)',
                    }} ghost onClick={() => keycloak.register()}>
                        NY BRUKER
                    </Button>
                  </>)}</Space>)  

 export default LoginSignupBtn;