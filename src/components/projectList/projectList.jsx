import React from 'react';
import { Card, Col, Row,Button } from 'antd';
import './projectList.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../api/projects';
import { fetchProjectList } from '../../redux/actions'

const ProjectList = () => {
  // useState hook
  const [error, setError] = useState(null);  
const dispatch = useDispatch();
const { data, isSearching } = useSelector(state => state.projects);

  const handleCommentsClick = () => {
    alert(`Comments button clicked.`);
  };

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
        <h2>Populære prosjekter</h2>
          {data.map(project => (
             <React.Fragment key={project.id}>
              <Row gutter={16} justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={24} sm={16} md={12} lg={8}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p>Status: {project.status}</p>
                  <p>Owner: {project.owner}</p>
                  <p>creative field: {project.category} </p>
                </Col>
                <Col xs={24} sm={12} style={{ marginBottom: 20 }}>
                  <img alt="project cover" src={project.img_url} />
                </Col>
              </Row>
            </React.Fragment>
          ))}
      </Card>
    );
  };
};

export default ProjectList;