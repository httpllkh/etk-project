import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>E-MAIL</h3>
        <p>etknv86@mail.ru</p>
      </div>
      <div className="footer-section">
        <h3>ТЕЛЕФОН</h3>
        <p>29-00-60</p>
      </div>
      <div className="footer-section">
        <h3>АДРЕС</h3>
        <p>628600</p>
        <p>Ханты-Мансийский Автономный округ - Югра , город Нижневартовск , улица Индустриальная, дом № 48, панель 14</p>
      </div>
      <div className="footer-section">
        <h3>РЕКВИЗИТЫ</h3>
        <p>ООО "Ермаковская Транспортная Компания"</p>
        <p>ИНН 8603139984</p>
        <p>КПП 860301001</p>
      </div>
    </footer>
  );
};

export default Footer;
