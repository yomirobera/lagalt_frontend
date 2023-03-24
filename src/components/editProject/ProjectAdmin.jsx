import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL } from '../../api/projects';
import { Card, Col, Row,Tag,Button} from 'antd';
import './projectAdmin.css';
import keycloak from '../keycloak/keycloak';
import musicImg from "../../assets/img/musicImg.png";
import { useNavigate } from "react-router-dom";
import Comment from '../Comment/Comment';

const ProjectAdmin = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    
    useEffect(() => {
        // Make an API call to get the project data
        fetch(`${API_URL}/${id}`)
          .then(response => response.json())
          .then(data => setProject(data))
          .catch(error => console.log(error));
      }, [id]);
//const project = useSelector(state => state.projects.data.find(project => project.id === id));
//find(project => project.id === id));
console.log(project);
let navigate = useNavigate();
        const routeChange = (path) =>{
          navigate(path);}
  return (
    <div className='detailsCardAdmin'>
      { project && (
         <Card>
            <Row gutter={16} style={{marginLeft: '0px', marginRight: '0px', paddingLeft: '25px'}}>
                <Col xs={24} sm={12} md={14} lg={14} className={project.category.replace(' ', '-').toLowerCase()}
                    style={{ paddingLeft: '50px',paddingTop:'25px', paddingRight: '0px'}}
                >
                <h2 className='categoryText'>{project.category} <span id='musicIcon' className={project.category.replace(' ', '-').toLowerCase()}></span></h2>
                <h3 className='projTitle'>{project.title}</h3>
                <div className='projTags'>
                    {project.skillsRequired.map(skill => (
                        <Tag className={project.category.replace(' ', '-').toLowerCase()} style={{ borderRadius: 20, margin: '5px', color:'white' }}>{skill}</Tag>
                    ))}
                </div>
                <p><strong>Beskrivelse av prosjektet: </strong>{project.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
                <p><strong>Ønskede ferdighter: </strong>{project.description}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
                tttLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                <div className='reqSkills'>
                    {project.skillsRequired.map(skill => (
                        <Tag className='skills' style={{ borderRadius: 20, margin: '5px' }}>{skill}</Tag>
                    ))}
                </div>
                <button onClick={() => {routeChange(`/EditProject/${project.id}`)}}>ENDRE Projekt</button>
                </Col>
                <Col xs={24} sm={12} md={10} lg={10} style={{paddingLeft: '0px',
                    paddingRight: '0px'}}>
                <img alt="project cover" src={musicImg /* project.img_url */} style={{ width: '100%',maxWidth: '100%',height:'100%', maxHeight: '100%', objectFit: 'cover'}} />
                </Col> 
                <Comment/>
                
            </Row>
         </Card>
      )}
    </div>
  );
};

export default ProjectAdmin