import React from 'react';
import { Card } from "antd";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../api/projects';
import { fetchProjectList } from '../../redux/actions'

const ProjectList = () => {
  // useState hook
  const [error, setError] = useState(null);  
const dispatch = useDispatch();
const { data, isSearching } = useSelector(state => state.projects);

  useEffect(() => {
    dispatch(fetchProjectList())
  }, []);

  if (error) { // display an error message
    return <div>Error: {error.message}</div>;
  } else if (isSearching) { // display a loading message, if it loading
    return <div>Loading...</div>;
  } else { 
    return (
      <Card>
        {data.map(project => ( 
          <div key={project.id}>
            <h2>{project.id}</h2>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>{project.status}</p>
            <p>{project.owner}</p>
            <p>{project.img_url}</p>
          </div>
        ))}
      </Card>
    );
  }
};

export default ProjectList;