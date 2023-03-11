import './App.css';
import React from "react";
import {
BrowserRouter,Routes,Route,useNavigate
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
function App() {
  return (
    <BrowserRouter>
     <div className="App"> 
     <NavBar/>
     <Routes>
      
     </Routes>
     </div>
    </BrowserRouter>
   
  );
}

export default App;
