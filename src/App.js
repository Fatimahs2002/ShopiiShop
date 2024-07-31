import React from 'react';
import {    Route,Routes  } from 'react-router-dom';
import User from './user';
import Dashboard from './dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


import '../src/assets/css/app.scss';
import PhoneRole from './global/phoneRole';
import AdminHome from './pages/dashboard/admin/index';
import Stores from './pages/dashboard/stores/index'; 
import Login from './components/dashboard/login/index';
import Signup from './components/dashboard/signup/index';
import Sections from './pages/dashboard/sections'
import Layout from './components/dashboard/layout/index';
import AddSection from './pages/dashboard/addSection'
import AddStore from './pages/dashboard/addStore';
import AddItem from './pages/dashboard/addItem';
import Items from './pages/dashboard/items';
function App() {

  return (
   
      <div className="App d-flex main-body">
   

     
        <Layout />
     
   
      <Routes>
      <Route path='/' element={<h1>super admin home </h1>} />
      <Route path="/sections" element={<Sections/>}/>
      <Route path="/user" element={<User />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/stores" element={<Stores />} />
      <Route path='/addsection' element={<AddSection />}/>
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
