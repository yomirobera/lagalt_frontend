import './App.css';
import React from "react";
import {
BrowserRouter,Routes,Route,useNavigate
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ProjectsList from './components/projectList/ProjectList'
function App() {
  return (
    <BrowserRouter>
     <div className="App"> 
     <NavBar/>
     <ProjectsList/>
     <Routes>
      
     </Routes>
     </div>
    </BrowserRouter>
   
  );
}

export default App;
