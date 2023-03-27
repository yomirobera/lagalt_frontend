import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Pagination, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from '../../hoc/withAuth';
import EditProject from './EditProject';
import keycloak from '../keycloak/keycloak';
import { Link, Route, Routes } from 'react-router-dom';
import LandingView from '../../Views/LandingView';
import ProfileView from '../../Views/ProfileView';
import { useNavigate } from "react-router-dom";
import '../../css/yourProjects.css';

const apiUrl = "http://localhost:8080";

//The number of projects to display per page
const PAGE_SIZE = 4;

const YourProjects = () => {
  const [data, setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // state for the currently selected project
  const [currentPage, setCurrentPage] = useState(1); // state for the current page number
 
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/users/${keycloak.tokenParsed.sub}/getProjectsOwned`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error))
  },[])

  const handleCardClick = (project) => {
    // set the selected project to the one that was clicked
    setSelectedProject(project);
  };

  const handlePageChange = (page) => {
    // set the current page to the one that was clicked
    setCurrentPage(page);
  };

  // calculate the start and end indexes of the projects to display based on the current page and page size
  const startIndex = (currentPage -1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  // slice the data array to get only the projects to display on the current page
  const pageData = data.slice(startIndex, endIndex);
 
  const columns = [
    {
      title: 'Navn på prosjekt',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`/ProjectAdmin/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Medlemmer',
      dataIndex: 'applications',
      key: 'applications',
      render: (applications) => <span className="applicationNr">{applications.length}</span>,
    },
  ];

  return (
    <div className='yourProj'>
      <h3>Dine prosjekter</h3>
      <Table
        dataSource={pageData.filter((project) => project.owner === keycloak.tokenParsed.sub)}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: PAGE_SIZE,
          total: data.length,
          onChange: handlePageChange,
          style: { marginTop: 100 },
        }}
      />
      {selectedProject && <Route path={`/ProjectAdmin/${selectedProject.id}`} component={() => <EditProject project={selectedProject} />} />}
    </div>
  );
};

export default withAuth(YourProjects);