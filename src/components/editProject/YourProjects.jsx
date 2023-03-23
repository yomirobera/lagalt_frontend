import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectList } from '../../redux/actions';
import withAuth from '../../hoc/withAuth';
import EditProject from './EditProject';
import keycloak from '../keycloak/keycloak';
import { Link } from 'react-router-dom';
import JoinProject from './ViewProject';

//The number of projects to display per page
const PAGE_SIZE = 4;

const YourProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null); // state for the currently selected project
  const [currentPage, setCurrentPage] = useState(1); // state for the current page number
  const dispatch = useDispatch(); // dispatch function from redux
  const { data } = useSelector((state) => state.projects); // the array of projects from the redux store

  useEffect(() => {
    // fetch the list of projects when the component mounts
    dispatch(fetchProjectList());
  }, []);

  const handleCardClick = (project) => {
    // set the selected project to the one that was clicked
    setSelectedProject(project);
  };

  const handlePageChange = (page) => {
    // set the current page to the one that was clicked
    setCurrentPage(page);
  };

  // calculate the start and end indexes of the projects to display based on the current page and page size
  const startIndex = (currentPage ) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  // slice the data array to get only the projects to display on the current page
  const pageData = data.slice(startIndex, endIndex);

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
          style={{ marginTop: 10 }}
        />
      </Col>
     
      {selectedProject && (
      <Link to={`/join-project/${selectedProject.id}`}>
        <JoinProject project={selectedProject} />
      </Link>
    )}
    </Row>
  );
};

export default withAuth(YourProjects);