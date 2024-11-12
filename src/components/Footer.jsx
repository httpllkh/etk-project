import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>E-MAIL</h3>
        <p>ko@rp-strj.ru; ko1@rp-strj.ru</p>
      </div>
      <div className="footer-section">
        <h3>ТЕЛЕФОН</h3>
        <p>+7 (38259) 3-44-11</p>
      </div>
      <div className="footer-section">
        <h3>АДРЕС</h3>
        <p>636780</p>
        <p>Томская область, г. Стрежевой, ул. Колторская, д. 61, стр. 2</p>
      </div>
      <div className="footer-section">
        <h3>РЕКВИЗИТЫ</h3>
        <p>ООО "Речное пароходство"</p>
        <p>ИНН 7022009271</p>
        <p>КПП 702201001</p>
        <p>ОГРН 1027006188335</p>
      </div>
    </footer>
  );
};

export default Footer;
