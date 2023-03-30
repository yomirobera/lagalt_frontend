import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../api/projects';
import { apiUrl } from '../../api/user';
import { Card, Col, Row,Tag,Button} from 'antd';
import './projectDetails.css';
import ApplyToProject from '../../components/Apply/ApplyToProject'
import keycloak from '../keycloak/keycloak';
import musicImg from "../../assets/img/musicImg.png";
import Comment from '../Comment/Comment';
const func = (project,id) => {
    if (!(keycloak.tokenParsed.sub === project.owner)) {
        for (const member of project.members) {
            if (member === keycloak.tokenParsed.sub) {
                return null;
            }
        }
        return (
        <div className='applyForm'>
            <ApplyToProject projectId={id} />
        </div>
        );
    }
    return null;
  };

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [userData, setUserData] = useState(null);
    const { skills, isLoading } = useSelector(state => state.projects);
    
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
        const fetchData = async () => {
            try {
                // Make an API call to get the project data
                const projectResponse = await fetch(`${API_URL}/${id}`);
                const project = await projectResponse.json();
                setProject(project);
    
                // Make an API call to get the user data
                const userResponse = await fetch(`${apiUrl}`);
                const userData1 = await userResponse.json();
                setUserData(userData1);
    
                // Set the user ID
               // setUserId(project.owner);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    // Render the project and user data once they have been fetched
    if (!project || !userData) {
        return <div>Loading...</div>;
    }
    
      
    
  return (
    <div className='detailsCard'>
      { project && (
         <Card className= 'projectListCard'>
            <Row gutter={16} style={{ 
                                      backgroundColor: '#ffff',
                                      maxMidth: '100%',
                                      minHeight: '100%',
                                      overflow: 'hidden',
                                      borderRadius:'20px',
                                      marginBottom:'25px',
                                      boxShadow: '0px 2px 2px 1px #aaaa',
                                      marginLeft: '0px', 
                                      marginRight: '0px', 
                                      paddingLeft: '25px', marginLeft: '0px', marginRight: '0px', paddingLeft: '25px'}}>
                <Col xs={24} sm={12} md={14} lg={14} id='cardstyles' className={project.category.replace(' ', '-').toLowerCase()}
                    style={{ paddingLeft: '50px',paddingTop:'25px', paddingRight: '0px',paddingBottom:'20px'}}
                >
                <h2 className='categoryText'>{project.category} <span id='musicIcon' className={project.category.replace(' ', '-').toLowerCase()}></span></h2>
                <h3 className='projTitle'>{project.title}</h3>
                <div className='projTags'>
                    {project.tags.map(tags => (
                        <Tag id='tagstyles' className={project.category.replace(' ', '-').toLowerCase()} style={{ borderRadius: 20, margin: '5px' }}>{tags}</Tag>
                    ))}
                </div>
                <p><strong>Beskrivelse av prosjektet: </strong>{project.description}
                </p>
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
                <div className='projMembers'>
                  <div className='porjOwner' style={{ display: "flex", alignItems: "center" }}>
                         <span style={{marginRight:"8px" }} ><strong>Prosjekt eier : </strong></span>
                         {userData.map(user =>{
                            if(user.id === project.owner){   
                                return(
                                <Link to={`/UserProfile/${user.id}`} style={{textDecoration: "underline", textDecorationThickness: "2px"}}>
                                    {<p>{user.f_name} {user.l_name}</p>}
                                </Link>)
                            }
                         })}
                    </div>
{/*this is for members*/}<ul className='projMedlemer'>
<li><strong>Prosjekt medlemer : </strong></li>
                            {project.members.map(member => {
                                let memberName = '';
                                const userDataKeys = Object.keys(userData);
                                for (let i = 0; i < userDataKeys.length; i++) {
                                const user = userData[userDataKeys[i]];
                                if (user.id === member) {
                                    memberName = `${user['f_name']} ${user['l_name']}`;
                                    break;
                                }
                                }
                                return (
                                <li key={member}>
                                    <Link to={`/UserProfile/${member}`}>
                                    {memberName || member}
                                    </Link>
                                </li>
                                );
                            })}
                     </ul>
                </div>
                {keycloak.authenticated ? <>{func(project,id)}</>:null}
                
                {!keycloak.authenticated && (
                <div className='card-loginLink'>
                    <p><strong>Vil du bli på dette prosjektet? </strong>
                    <a href="#" onClick={() => keycloak.login()}>Logg inn, </a>eller 
                    <a href="#" onClick={() => keycloak.register()}> register bruker</a></p>
                </div>
                )}
                </Col>
                <Col xs={24} sm={12} md={10} lg={10} style={{paddingLeft: '0px',
                    paddingRight: '0px'}}>
                <img alt="project cover" src={project.img_url} style={{ width: '100%',maxWidth: '100%',height:'100%', maxHeight: '100%', objectFit: 'cover'}} />
                </Col> 
            </Row>
           
            <Row className='comments' gutter={100} style={{marginLeft: '0px', marginRight: '0px', paddingLeft: '25px'}}>
                <Comment projectId={id} />
            </Row>
         </Card>
      )}
    </div>
  );
};

export default ProjectDetails;