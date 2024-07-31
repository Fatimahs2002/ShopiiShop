import React from 'react';
import { BrowserRouter as Router, Route,Routes, Link, useNavigate,useLocation  } from 'react-router-dom';
import User from './user';
import Dashboard from './dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


import '../src/assets/css/app.scss';
import PhoneRole from './components/dashboard/phoneRole/index';
import AdminHome from './pages/dashboard/admin/index';
import Stores from './pages/dashboard/stores/index'; 
import Login from './components/dashboard/login/index';
import Signup from './components/dashboard/signup/index';

import Layout from './components/dashboard/layout/index';
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
   
      <div className="App d-flex main-body">
   

      {(location.pathname === '/' || location.pathname === '/stores') && ( // Show layout on root and /stores path
        <Layout />
      )}
   
      <Routes>
  
      <Route path="/user" element={<User />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addStore" element={<AddStore />}/>
      <Route path="/additem" element={<AddItem />}/>
      <Route path="/items" element={<Items />}/>
     <Route path="/phoneRole" element={<PhoneRole/>}/>
    </Routes>
    </div>
  );
}

export default App;
