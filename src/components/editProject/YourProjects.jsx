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
//import '../../css/yourProjects.css';
import './yourProject.css';



const apiUrl = "https://superproapiavkennylu.azurewebsites.net";


//The number of projects to display per page
const PAGE_SIZE = 4;

const YourProjects = () => {
  const [data,setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // state for the currently selected project
  const [currentPage, setCurrentPage] = useState(1); // state for the current page number
  const [delatakerIproj, setDelatakerIproj] = useState([]);
  const userID = keycloak.tokenParsed.sub;
  

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/users/${keycloak.tokenParsed.sub}/getProjectsOwned`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error))
  },[])
//To be tested when user is approved for a project
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/users/${userID}/getProjectParticipated`)
    .then(response => response.json())
    .then(data => setDelatakerIproj(data))
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
    <div className='yourProjCard'>
      <table>
          <thead>
          <tr class="first-row">
           <th>Prosjekter du eier</th>
          </tr>
          <tr>
            <th>Navn på prosjekt</th>
            <th>Nye søkere</th>
          </tr>
          </thead>
          <tbody>
            {pageData.filter((project) => project.owner === keycloak.tokenParsed.sub).map((project) => (
              <tr key={project.id} style={{ marginBottom: 10 }} onClick={() => handleCardClick(project)}>
                <td>
                  <a href="#" onClick={() => routeChange(`/ProjectAdmin/${project.id}`)}>
                  {project.title} #{project.id}
                  </a>
                </td>            
                <td>
                  <span className="applicationNr">{project.applications.length}</span>
                </td>
              </tr>
            ))}
          </tbody>
          <br/>
          <tbody>
            <tr class="first-row2">
            <th>Prosjekter du deltar i</th>
            </tr>
            {console.log(delatakerIproj)}
            {delatakerIproj.map((project) => (
              <tr key={project.id} style={{ marginBottom: 10 }} onClick={() => handleCardClick(project)}>
                {console.log("YES")}
                <td>
                  <a href="#" onClick={() => routeChange(`/ProjectDetails/${project.id}`)}>
                  {project.title} #{project.id}
                  </a> 
                </td>            
              </tr>
            ))}
          </tbody>
        </table>
          <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={data.length}
              onChange={handlePageChange}
              style={{ marginTop: 50, display: 'flex', justifyContent: 'flex-end' }}
          />   
         {selectedProject && routeChange(`/ProjectAdmin/${selectedProject.id}`)}
    </div>
  
 
  

  
  );
};

export default withAuth(YourProjects);