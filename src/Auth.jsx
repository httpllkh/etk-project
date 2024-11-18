import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Auth.css';

const Auth = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // Для регистрации
    const [regEmail, setRegEmail] = useState('')
    const [regInn, setRegInn] = useState('')
    const [regKpp, setRegKpp] = useState('')
    const [regName, setRegName] = useState('')
    const [regFio, setRegFio] = useState('')
    const [regNumber, setRegNumber] = useState('')
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegOpenModal = () => {
        setIsRegModalOpen(true)
    }

    const handleRegCloseModal = () => {
        setIsRegModalOpen(false)
    }

    const handleOpenModal = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь добавьте проверку на авторизацию
        const isAuthenticated = true; 

        if (isAuthenticated) {
            login(); // Устанавливаем авторизацию
            navigate('/vehicle'); // Перенаправление на страницу Vehicle
        }
    };

    const regSubmit = () => {
        fetch('http://91.203.10.130:2783/portal/hs/ksapi/NEWREG', {
            method: "POST",
            body: JSON.stringify({
                email: regEmail,
                inn: regInn,
                kpp: regKpp,
                name: regName,
                fio: regFio,
                phonenumber: regNumber
            })
        }) 
    .then(response => response.json())
      .then(data => {
        console.log("Успех", data)
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
    }

    const loginRequest = () => {
        const loginData = {
            email: email,
            password: password,
        };

        fetch('http://91.203.10.130:2783/portal/hs/ksapi/AUTH', { 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            })
            .then(response => response.json())
            .then(data => {
            console.log(data)
            if (data.token) {
                localStorage.setItem('jwtToken', data.token);
                console.log('Авторизация успешна, токен сохранён');
            } else {
                setErrorMessage('Неверный логин или пароль');
            }
            })
            .catch(error => {
            console.error('Ошибка при авторизации:', error);
            setErrorMessage('Ошибка при авторизации');
            });
    }

    return (
        <div className="container">
            <div>
                <h1>ООО “Ермакская Транспортная Компания”</h1>
                <button onClick={handleOpenModal}>Вход</button>
                <button onClick={handleRegOpenModal}>Заявка на регистрацию</button>
            </div>

            {isLoginModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Войти</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label>Пароль:</label>
                                <input type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="submit-btn" onClick={loginRequest}>Войти</button>
                        </form>
                    </div>
                </div>
            )}

        {isRegModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleRegCloseModal}>&times;</span>
                        <h2>Заявка на регистрацию</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" placeholder="Введите email" onChange={(e) => setRegEmail(e.target.value) } required />
                            </div>
                            <div className="form-group">
                                <label>ИНН</label>
                                <input type="text" placeholder="Введите ИНН" onChange={(e) => setRegInn(e.target.value) } required />
                            </div>

                            <div className="form-group">
                                <label>КПП</label>
                                <input type="text" placeholder="Введите КПП" onChange={(e) => setRegKpp(e.target.value) } required />
                            </div>
                            <div className="form-group">
                                <label>Наименование организации</label>
                                <input type="text" placeholder="Введите наименование" onChange={(e) => setRegName(e.target.value) } required />
                            </div>
                            <div className="form-group">
                                <label>ФИО контакного лица</label>
                                <input type="text" placeholder="Введите ФИО" onChange={(e) => setRegFio(e.target.value) } required />
                            </div>

                            <div className="form-group">
                                <label>Номер телефона</label>
                                <input type="text" placeholder="Введите номер" onChange={(e) => setRegNumber(e.target.value) } required />
                            </div>
                            <button type="submit" className="submit-btn" onClick={regSubmit}>Отправить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Auth;
