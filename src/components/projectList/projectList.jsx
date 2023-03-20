import React from 'react';
import { Card, Col, Row,Tag,Button } from 'antd';
import './projectList.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../api/projects';
import { fetchProjectList } from '../../redux/actions'
import keycloak from '../keycloak/keycloak';
import musicImg from "../../assets/img/logo.png";

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
              <Row gutter={16} justify="center" align="middle" style={{ minHeight: '60vh' }}>
                <Col xs={24} sm={16} md={12} lg={8}>
                  <h2>{project.category}</h2>
                  <h3>{project.title}</h3>
                  <div>
                      {project.skillsRequired.map(skill => (
                        <Tag className={project.category.replace(' ', '-').toLowerCase()} style={{ borderRadius: 20, margin: '5px' }}>{skill}</Tag>
                      ))}
                  </div>
                  <p><strong>Beskrivelse av prosjektet: </strong>{project.description}</p>
                  <p><strong>ønskede ferdighter: </strong>{project.description}</p>
                  <div>
                      {project.skillsRequired.map(skill => (
                        <Tag  style={{ borderRadius: 20, margin: '5px' }}>{skill}</Tag>
                      ))}
                  </div>
                  <p><strong>Vil du bli på dette prosjektet? </strong>
                  <a href="#" onClick={() => keycloak.login()}>Logg inn, </a>eller 
                  <a href="#" onClick={() => keycloak.register()}> register bruker</a></p>
                </Col>
                <Col xs={24} sm={12} style={{ marginBottom: 20 }}>
                  <img alt="project cover" src={musicImg /* project.img_url */} style={{ maxWidth: '100%' }} />
                </Col>
              </Row>
            </React.Fragment>
          ))}
      </Card>
    );
  };
};

export default ProjectList;