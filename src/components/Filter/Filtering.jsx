import React from 'react';
import { useDispatch } from 'react-redux';
import { filterProjects } from '../../redux/projectsReducer';
import { fetchProjectList } from '../../redux/actions'

const Filtering = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState({});

  const filterSelectedproject = (value) => {
    dispatch(filterProjects(value))
  }

  const fetchAllProjects = () => {
    dispatch(fetchProjectList())
  }

  return (
    <div>
      <h2>Filter By:</h2>
      <button onClick={() => fetchAllProjects()}>Display All</button>
      <button onClick={() => filterSelectedproject('books')}>Books</button>
      <button onClick={() => filterSelectedproject('movies')}>Movies</button>
      <button onClick={() => filterSelectedproject('music')}>Music</button>
      <button onClick={() => filterSelectedproject('cloth')}>Cloth</button>
    </div>
  );
};

export default Filtering;