import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LandingView from './Views/LandingView';
import CreateprojectView from './Views/CreateprojectView';
import ProfileView from './Views/ProfileView';
import NavBar from './components/NavBar/NavBar';
import Filtering from './components/Filter/Filtering';
import ProjectList from './components/projectList/ProjectList';
import ProjectView from './Views/ProjectView';
import ProjectDetails from './components/projectDetails/ProjectDetails';
import ProjectDetailsView from './Views/ProjectDetailsView';
import JoinProjectView from './Views/JoinProjectView';
import EditProjectView from './Views/EditProjectView';
import ProjectAdminView from './Views/ProjectAdminView';import UserProfileView from './Views/UserProfileView';
import YourProfileView from './Views/YourProfileView';
import YourProjectsView from './Views/YourProjectsView';



function App() {
  
  return (
    <BrowserRouter>
        <div className="App">
          <NavBar />
            { <Routes>
              <Route path="/" element={ <LandingView />}/>
              <Route path="/CreateProject" element={ <CreateprojectView />}/>
              <Route path="/Projects" element={ <ProjectView />}/>
              <Route path="/YourProfile" element={ <YourProfileView />}/>
              <Route path="/profile" element={ <ProfileView />}/>
              <Route path="/YourProjects" element={ <YourProjectsView/>}/>
              <Route path="/ProjectAdmin/:id" element={<ProjectAdminView />}/>
              <Route path="/EditProject/:projectId" element={ <EditProjectView />}/>
              <Route path="/ProjectDetails/:id" element={<ProjectDetailsView />}/>
              <Route path="/join-project/:id" element={ <JoinProjectView />}/>
              <Route path="/UserProfile/:id" element={<UserProfileView/>}/>
            </Routes> }
        </div>
    </BrowserRouter>
      );
  
    }
    export default App;