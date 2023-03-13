import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';

import LandingView from './Views/LandingView';
import LoginView from './Views/LoginView';
import ProfileView from './Views/ProfileView';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <NavBar />
            <Routes>
              <Route path="/" element={ <LandingView />}/>
              <Route path="/login" element={ <LoginView />}/>
              <Route path="/profile" element={ <ProfileView />}/>
            </Routes>
        </div>
    </BrowserRouter>
    
  );
}

export default App;
