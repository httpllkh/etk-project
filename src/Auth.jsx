import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Auth.css';
import Footer from './components/Footer';
import Toast from './components/modals/Toast';
import { NavLink } from 'react-router-dom';

const Auth = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Для регистрации
    const [regEmail, setRegEmail] = useState('');
    const [regInn, setRegInn] = useState('');
    const [regKpp, setRegKpp] = useState('');
    const [regName, setRegName] = useState('');
    const [regFio, setRegFio] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    // Toast component
    const [showToast, setShowToast] = useState(false);

    // password show state
    const [showPassword, setShowPassword] = useState(false);  // добавляем состояние для видимости пароля

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegOpenModal = () => {
        setIsRegModalOpen(true);
    };

    const handleRegCloseModal = () => {
        setIsRegModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginData = {
                email: email,
                password: password,
            };

            const response = await fetch('https://etk861c.ru:2784/portal/hs/ksapi/AUTH', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            console.log(data)
            if (data.accessToken) {
                // Сохраняем токен
                localStorage.setItem('jwtToken', data.accessToken);
                console.log('Авторизация успешна, токен сохранён', data.accessToken);

                // Устанавливаем авторизацию и перенаправляем
                login(); 
                navigate('/vehicle');
            } else {
                // Если токен не получен
                setErrorMessage('Неверный логин или пароль');
            }
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            setErrorMessage('Ошибка при авторизации');
        }
    };

    const regSubmit = async () => {
        await fetch('https://https://etk861c.ru:2784/portal/hs/ksapi/NEWREG', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: regEmail,
                inn: regInn,
                kpp: regKpp,
                name: regName,
                fio: regFio,
                phonenumber: regNumber,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Успех', data);
                setShowToast(true);
                setIsRegModalOpen(false)
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных:', error);
            });

    };

    return (
        <div className="uppercontainer">
            <div className="container">
                <div>
                    <h1>ООО “Ермаковская Транспортная Компания”</h1>
                    <div className='auth-btn'>
                        <button className="btn" onClick={handleOpenModal}>Вход</button>
                        <button className="btn" onClick={handleRegOpenModal}>Заявка на регистрацию</button>
                    </div>
                </div>

                {isLoginModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <h2>Войти</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        placeholder="Введите email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Пароль:</label>
                                    <div className="password-input-container">
                                        <input
                                            type={showPassword ? 'text' : 'password'} // переключаем тип на 'text' или 'password'
                                            placeholder="Введите пароль"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password-btn"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <div className='show-pass'></div> : <div className='show-not-pass'></div>} {/* Иконки для переключения видимости */}
                                        </button>
                                    </div>
                                </div>
                                <NavLink to="/recoverpass" className="pass-recover-navlink">
                                    <p className='pass-recover'>Восстановить пароль</p>
                                </NavLink>
                                <button type="submit" className="submit-btn">Войти</button>
                            </form>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </div>
                    </div>
                )}

                {isRegModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleRegCloseModal}>&times;</span>
                            <h2>Заявка на регистрацию</h2>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        placeholder="Введите email"
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ИНН</label>
                                    <input
                                        type="text"
                                        placeholder="Введите ИНН"
                                        onChange={(e) => setRegInn(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>КПП</label>
                                    <input
                                        type="text"
                                        placeholder="Введите КПП"
                                        onChange={(e) => setRegKpp(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Наименование организации</label>
                                    <input
                                        type="text"
                                        placeholder="Введите наименование"
                                        onChange={(e) => setRegName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ФИО контактного лица</label>
                                    <input
                                        type="text"
                                        placeholder="Введите ФИО"
                                        onChange={(e) => setRegFio(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Номер телефона</label>
                                    <input
                                        type="text"
                                        placeholder="Введите номер"
                                        onChange={(e) => setRegNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-btn" onClick={regSubmit}>
                                    Отправить
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {showToast && <Toast message="Данные успешно отправлены!" onClose={() => setShowToast(false)} />}
            </div>
            <Footer />
        </div>
    );
};

export default Auth;
