import React from 'react';
import { useDispatch } from 'react-redux';
import { applyFilter, setSearchQuery } from '../actions';

const Filtering = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState({});

  const handleApplyFilter = () => {
    dispatch(applyFilter(filter));
  };

  const handleResetFilters = () => {
    setFilter({});
    dispatch(setSearchQuery(''));
  };

  return (
    <div>
      <h2>Filter By:</h2>
      <button onClick={() => setFilter({})}>Display All</button>
      <button onClick={() => setFilter({ category: 'books' })}>Books</button>
      <button onClick={() => setFilter({ category: 'movies' })}>Movies</button>
      <button onClick={() => setFilter({ category: 'music' })}>Music</button>
      <button onClick={handleResetFilters}>Reset Filters</button>
      <br />
      <label>
        Date Range:
        <input type="date" onChange={(e) => setFilter({ dateRange: e.target.value })} />
      </label>
      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
};

export default Filtering;