import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL } from '../../api/projects';
import { Card, Col, Row,Tag,Button} from 'antd';
import './projectDetails.css';
import keycloak from '../keycloak/keycloak';
import musicImg from "../../assets/img/musicImg.png";

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    
    useEffect(() => {
        // Make an API call to get the project data
        fetch(`${API_URL}/${id}`)
          .then(response => response.json())
          .then(data => setProject(data))
          .catch(error => console.log(error));
      }, [id]);

if (!project) {
    return <div>Loading...</div>;
}

  return (
    <div className='detailsCard'>
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
                <div className='reqSkills'>
                    {project.skillsRequired.map(skill => (
                        <Tag className='skills' style={{ borderRadius: 20, margin: '5px' }}>{skill}</Tag>
                    ))}
                </div>
                <div className='projMembers'>
                    <span className='porjOwner'><strong>Prosjekt eier : </strong><Link to={`/UserProfile/${project.owner}`}>{project.owner}</Link></span>
{/*this is for members*/}<ul className='projMedlemer'>
                           <li><strong>Prosjekt medlemer : </strong></li>
                           {project.members.map(member => (
                             <li key={member}>
                               <Link to={`/UserProfile/${member}`}>{member}</Link>
                             </li>
                            ))}
                        </ul>
                </div>
                <div className='card-loginLink'>
                    <p><strong>Vil du bli på dette prosjektet? </strong>
                    <a href="#" onClick={() => keycloak.login()}>Logg inn, </a>eller 
                    <a href="#" onClick={() => keycloak.register()}> register bruker</a></p>
                </div>
                </Col>
                <Col xs={24} sm={12} md={10} lg={10} style={{paddingLeft: '0px',
                    paddingRight: '0px'}}>
                <img alt="project cover" src={musicImg /* project.img_url */} style={{ width: '100%',maxWidth: '100%',height:'100%', maxHeight: '100%', objectFit: 'cover'}} />
                </Col> 
            </Row>
         </Card>
      )}
    </div>
  );
};

export default ProjectDetails;