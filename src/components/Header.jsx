import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [balance, setBalance] = useState("")
  const [agent, setAgent] = useState("")
  const [email, setEmail] = useState("")


  useEffect(() => {
    const fetchBalance = async () => {
      await fetch('http://91.203.10.130:2783/portal/hs/ksapi/getbalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
        }),
      })
        .then(response => response.json())
        .then(data => {
          setBalance(data);
        })
        .catch(error => {
          console.error('Ошибка при загрузке данных:', error);
        });
    }

    const fetchAgent = async () => {
      await fetch('http://91.203.10.130:2783/portal/hs/ksapi/getka', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
        }),
      })
        .then(response => response.json())
        .then(data => {
          setAgent(data);
        })
        .catch(error => {
          console.error('Ошибка при загрузке данных:', error);
        });


        
    }

    const fetchEmail = async () => {
      await fetch('http://91.203.10.130:2783/portal/hs/ksapi/getemail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
        }),
      })
        .then(response => response.json())
        .then(data => {
          setEmail(data);
        })
        .catch(error => {
          console.error('Ошибка при загрузке данных:', error);
        });
      }

    fetchAgent()
    fetchBalance()
    fetchEmail()
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const togglePanel = () => {
    setIsVisible(!isVisible); // Переключаем видимость панели
  };

  const toggleShowEmail = () => {
    setShowEmail(!showEmail);
  };
  return (
    <header>
      <div className="user-info">
        <span className='balance'>Баланс: {balance} ₽</span>
        <span className='user-name'>{agent}</span>
      </div>

      <div>
      <button className="settings-btn" onClick={togglePanel}>
        Настройки
      </button>

      {isVisible && (
        <div className="settings-panel">
          <span className="close" onClick={togglePanel}>&times;</span>
          <h2 className="settings-header">Настройки профиля</h2>
          <div className="settings-group">

            <div className="settings-item">
              <div className="settings-label">Имя пользователя</div>
              <div className="settings-value">ООО ДОРКОМПЛЕКТ</div>
            </div>

            <div className="settings-item">
              <div className="settings-label">Электронная почта</div>
              <div className="settings-value">
                {showEmail ? email : '*********@gmail.com'}
                <span className="settings-link" onClick={toggleShowEmail}>
                  {showEmail ? 'Скрыть' : 'Показать'}
                </span>
              </div>
            </div>

          </div>

          <h2 className="settings-section-header">Пароль и аутентификация</h2>
          <NavLink to="/changepassword" >
          <button className="change-password-btn">Изменить пароль</button>
          </NavLink>
        </div>
      )}
    </div>
    </header>
  );
};

export default Header;
