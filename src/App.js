import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Filtering from './components/Filter/Filtering';
import ProjectList from './components/projectList/ProjectList';
import YourProjectView from './Views/YourProjectView';
import NavBar from './components/NavBar/NavBar';
import LandingView from './Views/LandingView';
import CreateprojectView from './Views/CreateprojectView'
import ProfileView from './Views/ProfileView'
import ProjectView from './Views/ProjectView';
import ProjectDetails from './components/projectDetails/ProjectDetails';
import ProjectDetailsView from './Views/ProjectDetailsView';
import JoinProjectView from './Views/JoinProjectView';
import EditProjectView from './Views/EditProjectView';


function App() {
  
  return (
    <BrowserRouter>
        <div className="App">
          <NavBar />
            { <Routes>
              <Route path="/" element={ <LandingView />}/>
              <Route path="/CreateProject" element={ <CreateprojectView />}/>
              <Route path="/YourProject" element={ <YourProjectView />}/>
              <Route path="/Projects" element={ <ProjectView />}/>
              <Route path="/profile" element={ <ProfileView />}/>
              <Route path="/EditProject/:projectId" element={ <EditProjectView />}/>
              <Route path="/ProjectDetails/:id" element={<ProjectDetailsView />}/>
              <Route path="/join-project/:id" element={ <JoinProjectView />}/>
            </Routes> }
        </div>
    </BrowserRouter>
      );
  
    }
    export default App;