import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL_APPLI } from '../../api/projApplications';
import { Card,Divider,Meta, Col, Row,Tag,Button,Space, Avatar,Typography } from 'antd';
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
        try{
        const response = await fetch(`${API_URL_APPLI}/api/v1/application/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({status: "APPROVED"}),
          });
          //const data = await response.json();
          return response;
        } catch (error) {
          throw new Error(`Error updating project: ${error.message}`);
        }
    };
        //gets application id from eventhandlers in the form proj.id
    const handleReject = async (id) => {
        try{
            const response = await fetch(`${API_URL_APPLI}/api/v1/application/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({status: "APPROVED"}),
              });
              //const data = await response.json();
              return response;
            } catch (error) {
              throw new Error(`Error updating project: ${error.message}`);
            }
      };
    
    return (
        <>
            <Meta title="Nye søkere på prosjektet " />
            <Card
                hoverable
                style={{ width: 800 }}
                >
                    {project.map((proj) => (
                        <Divider>             
                            <p>{proj.motivation}</p>
                            <br />
                            <Button type="primary" 
                                onClick={() => handleAccept(proj.id)}> 
                                Accept
                            </Button>
                            <Button type="danger" style={{ marginLeft: '10px' }} 
                                 onClick={() => handleReject(proj.id)}> 
                                 Reject
                            </Button>
                            
                        </Divider>
                    ))}
            </Card>
        </>
          );
        }
        
export default AcceptRejectAppli;        
        