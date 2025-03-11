import React, { useEffect, useState } from 'react';
import './ChangePassword.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Toast from './components/modals/Toast'

const ChangePassword = () => {

  const [toastOpen, setToastOpen] = useState(false)
  const [newPass, setNewPass] = useState("")


  const ChangePass = async () => {
      await fetch('https://etk861c.ru:2784/portal/hs/ksapi/corpass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
          password: newPass
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        localStorage.setItem('jwtToken', data.accessToken);
        setToastOpen(true)
      })
      

  };



  return (
    <div className="uppermain">
      <div className="body">
        <Sidebar isVehicle={true} isNews={false} isDetail={false} />
        <div className="main">
          <Header />
          <section className='pass-section'>
            <h2>Изменить пароль</h2>
            <div className="pass-actions">
              <input type="text" placeholder="Введите новый пароль" className='search-bar' onChange={(e) => setNewPass(e.target.value)} />
              <button className='btn' onClick={ChangePass}>Изменить пароль</button>
            </div>
          </section>

        </div>
      </div>
      {toastOpen && <Toast message={"Ваш пароль был изменен!"} onClose={() => setToastOpen(false)} />}
      <Footer />
    </div>
  );
};

export default ChangePassword;
