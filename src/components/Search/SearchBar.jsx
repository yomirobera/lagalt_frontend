import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { searchProjects } from '../../redux/projectsReducer';

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
  const onSearch = (value) => {
      dispatch(searchProjects(value));
  };

  return (
      <Space direction="vertical">
      <Input.Search placeholder="Søk..." className='searchbtn' onSearch={onSearch} enterButton />
      </Space> 
    );
};

export default SearchBar;