import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePic from './IMG_5739.JPG';
import employee1 from './employee1.jpg';
import employee2 from './employee2.jpg';
import employee3 from './employee3.jpg';
import logo from './logo.jpeg';
import NavAdmin from './components/navadmin';
import SideNavAdmin from './components/sidenavadmin';
import VoteEmp from './voteemp'; // Import the VoteEmp component
import Resultss from './results';

import Adminnnnn from './adminHome'; // Import the Adminnnnn component
import Login from './login';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" exact element={<Adminnnnn />} />
        <Route path="/voteemp" exact element={<VoteEmp />} />
        <Route path="/results" exact element={<Resultss />} />
          
        <Route path="/login" exact element={<Login />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;