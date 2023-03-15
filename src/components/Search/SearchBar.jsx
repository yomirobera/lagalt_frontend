import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

import React from 'react';
import { useDispatch } from 'react-redux';


const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState('');
  const onSearch = (value) => {
      dispatch({type: 'SET_SEARCH_QUERY', payload: value});
  };

  return (
      <Space direction="vertical">
      <Input.Search placeholder="input search text" className='searchbtn' onSearch={onSearch} enterButton />
      </Space> 
    );
};

export default SearchBar;