import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

import React from 'react';
import { useDispatch } from 'react-redux';
import projectsReducer from '../../redux/projectsReducer';
import { setSearchQuery} from'../../redux/projectsReducer';

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value) => {
  value.preventDefault();
  dispatch(setSearchQuery(query));
};


const SearchBar = () => {
 
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState('');

  return (
      <Space direction="vertical">
      <Input.Search placeholder="input search text" className='searchbtn' onSearch={onSearch} enterButton />
      </Space> 
    );
};

export default SearchBar;