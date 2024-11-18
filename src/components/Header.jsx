import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="user-info">
      <button className='settings-btn'>Настройки</button>
        <span className='balance'>Баланс: 0</span>
        <span className='user-name'>Когай Е.О.</span>
      </div>
    </header>
  );
};

export default Header;