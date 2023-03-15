import React from 'react';
import { Card, Col, Row, Button } from 'antd';
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
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>  
      <Col xs={24} sm={16} md={12} lg={8}> 
        {project.map(project => (
          <Card
          extra={<a href='#'>View more details</a>}
            key={project.id}
            style={{ marginBottom: 20 }}
            cover={<img alt="project cover" src={project.img_url} />}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
            <p>Owner: {project.owner}</p>
            <p>creative field: {project.category} </p>
            <Button type="primary">comments</Button>
          </Card>
        ))}
      </Col>
    </Row>
    );
  };
};

export default ProjectList;