import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from '../../hoc/withAuth';
import EditProject from './EditProject';
import keycloak from '../keycloak/keycloak';
import { Link, Route, Routes } from 'react-router-dom';
import LandingView from '../../Views/LandingView';
import ProfileView from '../../Views/ProfileView';
import { useNavigate } from "react-router-dom";
import ProjectAdmin from './ProjectAdmin';


const apiUrl = "http://localhost:8080";


//The number of projects to display per page
const PAGE_SIZE = 4;

const YourProjects = () => {
  const [data,setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // state for the currently selected project
  const [currentPage, setCurrentPage] = useState(1); // state for the current page number
 

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/users/${keycloak.tokenParsed.sub}/getProjectsOwned`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error))
  },[])

  // console.log(data,"JEG VIL HA DEN")
  // // useEffect(() => {
  // //   // fetch the list of projects when the component mounts
  // //   dispatch(fetchMyProjectList());
  // // }, []);

  const handleCardClick = (project) => {
    // set the selected project to the one that was clicked
    setSelectedProject(project);
    console.log(project.description)
  };

  const handlePageChange = (page) => {
    // set the current page to the one that was clicked
    setCurrentPage(page);
  };
  console.log(currentPage)

  // calculate the start and end indexes of the projects to display based on the current page and page size
  const startIndex = (currentPage -1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  console.log(startIndex,endIndex)
  // slice the data array to get only the projects to display on the current page
  const pageData = data.slice(startIndex, endIndex);
  console.log("PAGE",pageData)
  let navigate = useNavigate(); 
  const routeChange = (path) =>{ 
    navigate(path);}

  return (
    <Row justify="center" align="middle" style={{  marginTop: '70px' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <h2>Endre eksisterende project</h2>
        <h3>Prosjektene dine</h3>
       
        {pageData.filter((project) => project.owner === keycloak.tokenParsed.sub).map((project) => (
          <Card key={project.id} style={{ marginBottom: 10 }} onClick={() => handleCardClick(project)}>
            <h3 style={{cursor: 'pointer'}}>{project.title}</h3>
          </Card>
        ))}
      
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={data.length}
          onChange={handlePageChange}
          style={{ marginTop: 100 }}
        />
      </Col>
    
      {selectedProject && <ProjectAdmin selectedProject={selectedProject} /> && routeChange(`/ProjectAdmin/${selectedProject.id}`)}
    </Row>
  );
};

export default withAuth(YourProjects);