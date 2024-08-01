import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from './logo.jpeg';
import './index.css';
import { HiHome, HiLocationMarker } from 'react-icons/hi';
import { MdDashboardCustomize } from 'react-icons/md';
import { PiShoppingBagFill } from 'react-icons/pi';
import { BiExit } from 'react-icons/bi';
import { FaStore } from 'react-icons/fa';

const Layout = () => {
  const [user, setUser] = useState(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      try {
        setUser(userInfo.result);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setIsIn(true);
      console.log(user.role);
    }
  }, [user]);

  const location = useLocation();

  return (
    <div>
      {isIn && user.role === 'superAdmin' && (
        <nav>
          <div>
            <ul>
              <li>
                <NavLink to="/" activeclassname="active" className={location.pathname === "/" ? "active" : ""}>
                  <img width={150} src={logo} alt="" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/sections" activeclassname="active" className={location.pathname === "/sections" ? "active" : ""}>
                  <MdDashboardCustomize /> Sections
                </NavLink>
              </li>
              <div>
                <li>
                  <NavLink to="/stores" activeclassname="active" className={location.pathname === "/stores" ? "active" : ""}>
                    <FaStore /> Stores
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/items" activeclassname="active" className={location.pathname === "/items" ? "active" : ""}>
                    <PiShoppingBagFill /> Items
                  </NavLink>
                </li>
              </div>
              <li>
                <NavLink to="/map" activeclassname="active" className={location.pathname === "/map" ? "active" : ""}>
                  <HiLocationMarker /> Map
                </NavLink>
              </li>
              <li className="mt-auto">
                <NavLink
                  className="flex-row"
                  onClick={() => {
                    localStorage.clear();
                    setIsIn(false);
                  }}
                  to="/login"
                  activeclassname="active"
                >
                  <BiExit /> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Layout;
