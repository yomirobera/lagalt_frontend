import { AudioOutlined } from '@ant-design/icons';
import { Input,Button, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const onSearch = (value) => console.log(value);
const SearchBar = () => (
  <Space direction="vertical"  className="site-button-ghost-wrapper" wrap>
   <Search placeholder="input search text" onSearch={onSearch} enterButton />
   <Button type="primary" ghost>Login</Button>
   <Button type="primary" ghost>Signup</Button>
  </Space> 
  

 );
export default SearchBar;