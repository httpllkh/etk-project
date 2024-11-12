import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      
      <div className="sidebar-item"> 
      <NavLink to="/vehicle" activeClassName="active">
        <img className='sidebar-image' src={`${process.env.PUBLIC_URL}/ship.png`} />
        </NavLink>
        <h4>Мои ТС</h4>
        </div>

        
      <div className="sidebar-item">
      <NavLink to="/news" activeClassName="active">
      <img className='sidebar-image' src={`${process.env.PUBLIC_URL}/document.png`} />
      </NavLink>
      <h4>Новости</h4></div>
    </div>
  );
};

export default Sidebar;