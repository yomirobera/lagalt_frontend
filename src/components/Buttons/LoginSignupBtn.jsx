import { AudioOutlined } from '@ant-design/icons';
import {Button, Space } from 'antd';

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
   <Button className='btnLogin' type="primary" ghost>Log In</Button>
   <Button className='btnSignup' type="primary" ghost>Sign Up</Button>
  </Space> 
  

 );
export default LoginSignupBtn;