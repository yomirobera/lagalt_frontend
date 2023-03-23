
import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LandingView from './Views/LandingView';
import CreateprojectView from './Views/CreateprojectView';
import ProfileView from './Views/ProfileView';
import NavBar from './components/NavBar/NavBar';
import Filtering from './components/Filter/Filtering';
import ProjectList from './components/projectList/ProjectList';
import EditProjectView from './Views/EditProjectView';
import ProjectView from './Views/ProjectView';
import ProjectDetails from './components/projectDetails/ProjectDetails';
import ProjectDetailsView from './Views/ProjectDetailsView';
import JoinProjectView from './Views/JoinProjectView';



function App() {
  
  return (
    <BrowserRouter>
        <div className="App">
          <NavBar />
            { <Routes>
              <Route path="/" element={ <LandingView />}/>
              <Route path="/CreateProject" element={ <CreateprojectView />}/>
              <Route path="/EditProject" element={ <EditProjectView />}/>
              <Route path="/YourProject" element={ <ProjectView />}/>
              <Route path="/profile" element={ <ProfileView />}/>
              <Route path="/ProjectDetails/:id" element={<ProjectDetailsView />}/>
              <Route path="/join-project/:id" element={ <JoinProjectView />}/>
            </Routes> }
        </div>
    </BrowserRouter>
    
  );
  
}

export default App;
