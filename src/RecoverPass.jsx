import React, { useState } from 'react';
import './RecoverPass.css'; 
import Toast from "./components/modals/Toast"
import { NavLink, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [toastOpen, setToastOpen] = useState(false)

  const navigate = useNavigate(); //хук для навигации

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    setToastOpen(true)
    e.preventDefault();

    // Здесь будет ваш запрос на сервер
      // Пример запроса на сервер
      await fetch('https://etk861c.ru:2784/portal/hs/ksapi/SENDPASSRECOVERY', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        
      })

      }


  return (
    <div className="password-reset-page">
      <div className="password-reset-container">
        <h2>Восстановление пароля</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Электронная почта:</label>
            <input className='recover-input'
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Введите вашу почту"
            />
            
          </div>
          <button type="submit" className='recover-button'>Восстановить пароль</button>
          <NavLink to="/">
          <button type="close" className='recover-button'>Вернутся на главную</button>
          </NavLink>
        </form>
      </div>
      {toastOpen && <Toast message={"Заявка на смену пароля отправлена!"} onClose={() => setToastOpen(false)} />}
    </div>
  );
};

export default PasswordReset;
