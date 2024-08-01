import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';

import logo from './logo.jpeg';
import './index.css';
import { HiHome, HiLocationMarker } from 'react-icons/hi';
import { MdDashboardCustomize } from 'react-icons/md';
import { PiShoppingBagFill } from 'react-icons/pi';
import { BiExit } from 'react-icons/bi';
import { FaStore } from 'react-icons/fa';

const Layout = ({ isAdmin }) => {

  const location = useLocation();
  console.log(location)
  console.log(location.pathname)
  return (
    <>
      <nav>
        <img width={150} src={logo} alt='' />
        <ul>

          {isAdmin && (
            <li><NavLink to="/sections" activeClassName="active" className={location.pathname === "/addSection" ? "active" : ""}><MdDashboardCustomize /> sections</NavLink></li>
          )}

          {!isAdmin && (
            <>
              <li><NavLink to="/stores" activeClassName="active" className={location.pathname === "/addStore" ? "active" : ""}><FaStore /> Stores</NavLink></li>
              <li><NavLink to="/items" activeClassName="active" className={location.pathname === "/addItem" ? "active" : ""}><PiShoppingBagFill /> items</NavLink></li>
            </>
          )}
          <li><NavLink to="/map" activeClassName="active"><HiLocationMarker /> Map</NavLink></li>
          <li><NavLink to="/src/pages/dashboard/CategoryInStore" activeClassName="active"><HiLocationMarker /> Category In Store</NavLink></li>
          <li className='mt-auto'><NavLink className='flex-row' to="/login" activeClassName="active"><BiExit /> Logout</NavLink></li>
        
        </ul>
      </nav>
      {/*<li><NavLink to="/home" activeClassName="active"><HiHome /> sections</NavLink></li>
        <li><NavLink to="/addSection" activeClassName="active"><PiShoppingBagFill /> add section</NavLink></li>
        <li><NavLink to="/addStore" activeClassName="active"><MdDashboardCustomize /> add store</NavLink></li>
        <li><NavLink to="/addStore" activeClassName="active"><PiShoppingBagFill /> add store</NavLink></li>
        <li><NavLink to="/addItem" activeClassName="active"><PiShoppingBagFill /> add item</NavLink></li> */}

    </>
  )
}

export default Layout