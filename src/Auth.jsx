// import React, { useState } from 'react';
// import './Auth.css'; 
// import CryptoJS from 'crypto-js'; 
// const Auth = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const hashedPassword = password;

//     const loginData = {
//       email: email,
//       password: hashedPassword,
//     };
    

//     fetch('http://91.203.10.130:2783/portal/hs/ksapi/AUTH', { 
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(loginData),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//         if (data.token) {
//           localStorage.setItem('jwtToken', data.token);
//           console.log('Авторизация успешна, токен сохранён');
//         } else {
//           setErrorMessage('Неверный логин или пароль');
//         }
//       })
//       .catch(error => {
//         console.error('Ошибка при авторизации:', error);
//         setErrorMessage('Ошибка при авторизации');
//       });
//   };

//   return (
//     <div className="auth-container">
//       <h2>Авторизация</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Введите email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Пароль:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Введите пароль"
//             required
//           />
//         </div>
//         <button type="submit">Войти</button>
//       </form>
//       {errorMessage && <p className="error">{errorMessage}</p>}
//     </div>
//   );
// };

// export default Auth;



// import React, { useEffect, useState } from 'react';
// import './Auth.css'; // Импортируем стили

// const Auth = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

    
//     const handleOpenModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     useEffect(() => {
//         console.log("Произошел рендер")
//     })

//     return (
//         <div className="container">
//             <div>
//                 <h1>ООО “Ерамакская Транспортная Компания”</h1>
//                 <button onClick={handleOpenModal}>Авторизоваться</button>
//                 <button>Подробнее</button>
//             </div>

//             {isModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={handleCloseModal}>&times;</span>
//                         <h2>Войти</h2>
//                         <form>
//                             <div className="form-group">
//                                 <label>Email:</label>
//                                 <input type="email" placeholder="Введите email" required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Пароль:</label>
//                                 <input type="password" placeholder="Введите пароль" required />
//                             </div>
//                             <button type="submit" className="submit-btn">Войти</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Auth;


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
                email: "email@mail.ru",
                inn: "888989898",
                kpp: "8948394",
                name: "ООО что-что",
                fio: "Васильев Оскар Абдувалиевич",
                phonenumber: "89825159755"
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
                                <input type="email" placeholder="Введите email" required />
                            </div>
                            <div className="form-group">
                                <label>ИНН</label>
                                <input type="text" placeholder="Введите ИНН" required />
                            </div>

                            <div className="form-group">
                                <label>КПП</label>
                                <input type="text" placeholder="Введите КПП" required />
                            </div>
                            <div className="form-group">
                                <label>Наименование организации</label>
                                <input type="text" placeholder="Введите наименование" required />
                            </div>
                            <div className="form-group">
                                <label>ФИО контакного лица</label>
                                <input type="text" placeholder="Введите ФИО" required />
                            </div>

                            <div className="form-group">
                                <label>Номер телефона</label>
                                <input type="text" placeholder="Введите номер" required />
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
