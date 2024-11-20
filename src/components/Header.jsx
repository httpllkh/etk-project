import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [balance, setBalance] = useState("")
  const [agent, setAgent] = useState("")
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

    fetchAgent()
    fetchBalance()
  }, [])
  return (
    <header>
      <div className="user-info">
      <button className='settings-btn'>Настройки</button>
        <span className='balance'>Баланс: {balance}</span>
        <span className='user-name'>{agent}</span>
      </div>
    </header>
  );
};

export default Header;