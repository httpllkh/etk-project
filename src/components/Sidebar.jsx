import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>ООО "ЕТК"</h1>
      <nav>
        <ul>
          <NavLink to="/vehicle" activeClassName="active">
          <li><p className='active'>Мои ТС</p></li>
          </NavLink>
          <NavLink to="/news" activeClassName="active">
          <li><p >Новости</p></li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;