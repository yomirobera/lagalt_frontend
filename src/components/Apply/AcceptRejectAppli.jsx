import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card,Divider,Meta,message,Col, Row,Tag,Button,Space, Avatar,Typography } from 'antd';
import './AcceptReject.css';
import keycloak from '../keycloak/keycloak';

const AcceptRejectAppli = (props) => {
    //get project id from the url
    const [project, setProject] = useState('');
    const { Text } = Typography;
    const { Meta } = Card;
    const API_URL_APPLI = "http://localhost:8080";
    const projectID = props.projID;
    //const userId = keycloak.tokenParsed.sub;
    
    useEffect(() => {
        console.log('what is this id prop one more time?',projectID);
        // Make an API call to get the project data
        fetch(`${API_URL_APPLI}/api/v1/project/${projectID}/projectApplications`)
          .then(response => response.json())
          .then(data => setProject(data))
          .catch(error => console.log(error));
      }, [projectID]);

    if (!project) {
        return <div>Loading...</div>;
        };
    //gets application id from eventhandlers in the form proj.id
    const handleAccept = async (id) => {
       message.success('Søknad akseptert!');
        try{
        const response = await fetch(`${API_URL_APPLI}/api/v1/application/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
                id:id,
                status: "APPROVED",
                motivation:""
              }),
          });
          //const data = await response.json();
          setProject(project.filter((project) => project.id !== id));
          return response;
        } catch (error) {
          throw new Error(`Error updating project: ${error.message}`);
        }
       
    };
        //gets application id from eventhandlers in the form proj.id
    const handleReject = async (id) => {
        message.error('Søknad avslått!');
        try{
            const response = await fetch(`${API_URL_APPLI}/api/v1/application/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(
                {
                  id:id,
                  status: "DENIED",
                  motivation:""                 
                }),
              });
              //const data = await response.json();
              setProject(project.filter((project) => project.id !== id));
              return response;
            } catch (error) {
              throw new Error(`Error updating project: ${error.message}`);
            }
      };
    
    return (
    <div className='card-container'>
      <h3 className='card-title'>Nye søkere på prosjektet</h3>
      <Card className='card-body'>
        {project.map((proj) => (
          <Row gutter={[16, 16]} style={{ marginLeft: '0px', marginRight: '0px', paddingLeft: '25px', display: 'flex', justifyContent: 'space-between' }}>         
            <Col xs={20} sm={8} md={10} lg={10}>
                <p className='card-motivation'>{proj.motivation}</p>
            </Col>
                <br/>
            <Col xs={4} sm={4} md={4} lg={4} style={{marginRight: '-160px'}}>
                <Button className={proj.category} type="primary" onClick={() => handleAccept(proj.id)}>Accept</Button>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
                <Button type="danger"  onClick={() => handleReject(proj.id)}>Reject</Button>
            </Col>
          </Row>
        ))}
      </Card>
     </div>
      );
    }
        
export default AcceptRejectAppli;        
        