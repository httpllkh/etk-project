import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <span>ООО "ЕТК"</span>
      </div>

      <div className="header-menu">

        <button>Настройки</button>
        <span>Баланс: 0</span>
        <span>Когай Е.О.</span>
      </div>
    </header>
  );
};

export default Header;