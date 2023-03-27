import React from 'react';
import {Link} from "react-router-dom";
import { Card, Col, Row,Tag,Button} from 'antd';
import './projectList.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectList } from '../../redux/actions'
import keycloak from '../keycloak/keycloak';
import musicImg from "../../assets/img/musicImg.png";

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
         <div className='projectList-container'> 
            <Card>
              <h2 className='cardHeader'>Populære prosjekter</h2>
                {data.map(project => (
                  <React.Fragment key={project.id}>
                    <Link to={`/ProjectDetails/${project.id}`}>
                        <Row gutter={16} style={{marginLeft: '0px', marginRight: '0px', paddingLeft: '25px'}}>
                          <Col xs={24} sm={12} md={14} lg={14} className={project.category.replace(' ', '-').toLowerCase()}
                              style={{ paddingLeft: '50px',paddingTop:'25px', paddingRight: '0px'}}
                            >
                            <h2 className='categoryText'>{project.category} <span id='musicIcon' className={project.category.replace(' ', '-').toLowerCase()}></span></h2>
                            <h3 className='projTitle'>{project.title}<span className='arrowIcon'></span></h3>
                            <div className='projTags'>
                                {project.tags.map(skill => (
                                  <Tag className={project.category.replace(' ', '-').toLowerCase()} style={{ borderRadius: 20, margin: '5px', color:'#000' }}>{skill}</Tag>
                                ))}
                            </div>
                            <p><strong>Beskrivelse av prosjektet: </strong>{project.description}</p>
                            <p><strong>Ønskede ferdighter </strong></p>
                            <div className='reqSkills'>
                                {project.skillsRequired.map(skill => (
                                  <Tag className='skills' style={{ borderRadius: 20, margin: '5px' }}>{skill}</Tag>
                                ))}
                            </div>

                          </Col>
                          <Col xs={24} sm={12} md={10} lg={10} style={{paddingLeft: '0px',
                              paddingRight: '0px'}}>
                            <img alt="project cover" src={ project.img_url} style={{ width: '100%',maxWidth: '100%',height:'100%', maxHeight: '100%', objectFit: 'cover'}} />
                          </Col> 
                        </Row>
                      </Link>
                  </React.Fragment>
                ))}
            </Card>
          </div>
    );
  };
};

export default ProjectList;