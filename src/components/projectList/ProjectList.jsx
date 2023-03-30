import React from 'react';
import {Link} from "react-router-dom";
import { Card, Col, Row,Tag,Button} from 'antd';
import './projectList.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectList } from '../../redux/actions';
import { fetchUserSkills } from '../../redux/actions';
import { fetchSkills } from '../../redux/projectsReducer';
import keycloak from '../keycloak/keycloak';
import musicImg from "../../assets/img/musicImg.png";

const ProjectList = () => {
  // useState hook
const [error, setError] = useState(null);  
const dispatch = useDispatch();
const { data, isSearching } = useSelector(state => state.projects);
const { skills, isLoading } = useSelector(state => state.projects);


  const handleCommentsClick = () => {
    alert(`Comments button clicked.`);
  };
   
  const matchingSkillNames =  (project) => {
    return project.skillsRequired
       .filter(skill => skills.some(skills => skills.title === skill))
       .map(skill => skill.toLowerCase());}

  const getMatchingSkillsCount = (project) => {
    const matchingSkills = matchingSkillNames(project);
    const totalSkills = project.skillsRequired.length;
    const matchingCount = matchingSkills.length;
    const nonMatchingCount = totalSkills - matchingCount;
    return `${matchingCount}/${totalSkills}`;
  }


  

  useEffect(() => {
    dispatch(fetchProjectList())
  }, []);

  useEffect(() => {
    if (keycloak && keycloak.authenticated) {
      dispatch(fetchUserSkills());
    } else {
      console.log("User not authenticated, setting default skills");
      dispatch(fetchSkills([]));
    }
  }, []);

    // Render the project and user data once they have been fetched
    if (!Array.isArray(data) || !Array.isArray(skills)) {
      return <div>Loading...</div>;
  }

  if (error) { // display an error message
    return <div>Error: {error.message}</div>;
  } else if (isSearching || isLoading) { // display a loading message, if it loading 
    return <div>Loading...</div>;
  } else { 
    return (
         <div className='projectList-container'> 
            <Card className= 'projectListCard'>
              <h2 className='cardHeader'>Populære prosjekter</h2>
                {data.map(project => (
                  <React.Fragment key={project.id}>
                    <Link to={`/ProjectDetails/${project.id}`}>
                        <Row id='PlistRow' gutter={16} style={{
                                      backgroundColor: '#ffff',
                                      maxMidth: '100%',
                                      minHeight: '100%',
                                      overflow: 'hidden',
                                      borderRadius:'20px',
                                      marginBottom:'25px',
                                      boxShadow: '0px 2px 2px 1px #aaaa',
                                      marginLeft: '0px', marginRight: '0px', paddingLeft: '25px'}}>
                          <Col xs={24} sm={12} md={14} lg={14} id='cardstyles' className={project.category.replace(' ', '-').toLowerCase()}
                              style={{ paddingLeft: '50px',paddingTop:'25px', paddingRight: '0px'}}
                            >
                            <h2 className='categoryText'>{project.category} <span id='musicIcon' className={project.category.replace(' ', '-').toLowerCase()}></span></h2>
                            <h3 className='projTitle'>{project.title}<span className='arrowIcon'></span></h3>
                            <div className='projTags'>
                                {project.tags.map(skill => (
                                  <Tag id='tagstyles' className={project.category.replace(' ', '-').toLowerCase() } style={{ borderRadius: 20, margin: '5px', color:'#000' }}>{skill}</Tag>
                                ))}
                            </div>
                            <p><strong>Beskrivelse av prosjektet: </strong>{project.description}</p>
                            <p><strong>{getMatchingSkillsCount(project)} ferdigheter matcher din profil </strong></p>                         
                            <div className='reqSkills'>
                              {project.skillsRequired.map(skill => (
                                <Tag
                                className={`skills ${matchingSkillNames(project).includes(skill.toLowerCase()) ? 'matching' : 'non-matching'}`}
                                key={skill}
                                >
                                  {skill}
                                </Tag>
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