
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
<<<<<<< HEAD
import ProjectDetails from './components/projectDetails/ProjectDetails';
import ProjectDetailsView from './Views/ProjectDetailsView';
=======
import JoinProjectView from './Views/JoinProjectView';
>>>>>>> 022964b3e23efb4264a9e02fa56555c4525122fc



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
<<<<<<< HEAD
              <Route path="/ProjectDetails/:id" element={<ProjectDetailsView />}/>
=======
              <Route path="/join-project/:id" element={ <JoinProjectView />}/>
>>>>>>> 022964b3e23efb4264a9e02fa56555c4525122fc
            </Routes> }
        </div>
    </BrowserRouter>
    
  );
  
}

export default App;
