import React from 'react';
import { Card } from "antd";
import { useState, useEffect } from 'react';
import { API_URL } from '../../api/projects';

const ProjectList = () => {
  // useState hook
  const [error, setError] = useState(null); 
  const [isLoaded, setIsLoaded] = useState(false); 
  const [project, setItems] = useState([]); 

  useEffect(() => {
    fetch(API_URL) // make a GET request to the API
      .then(res => res.json()) 
      .then(
        result => { 
          setIsLoaded(true);
          setItems(result);
        },
        error => { // handle any errors
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) { // display an error message
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) { // display a loading message, if it loading
    return <div>Loading...</div>;
  } else { 
    return (
      <Card>
        {project.map(project => ( 
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