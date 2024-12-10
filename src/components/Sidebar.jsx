import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = ({isVehicle, isNews, isDetail}) => {
  return (
    <div className="sidebar">
      <h1>ООО "ЕТК"</h1>
      <nav>
        <ul>
          <NavLink to="/vehicle" >
            <li><p className={isVehicle ? 'active' : ''}>Мои ТС</p></li>
          </NavLink>
          <NavLink to="/news">
            <li><p className={isNews ? 'active' : ''}>Новости</p></li>
          </NavLink>
          <NavLink to="/detail">
            <li><p className={isDetail ? 'active' : ''}>Детализация</p></li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
