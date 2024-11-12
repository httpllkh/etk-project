import React, { useEffect, useState } from 'react';
import './Vehicles.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AddModal from './components/modals/AddModal';
import InvoiceModal from './components/modals/InvoiceModal';
import ActModal from './components/modals/ActModal';


const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addModalActive, setAddModalActive] = useState(false); //Модальное окно добавить
  const [invoiceModalActive, setInvoiceModalActive] = useState(false)
  const [actModalActive, setActModalActive] = useState(false)



  useEffect(() => {
    fetch('http://91.203.10.130:2783/portal/hs/ksapi/getTS', {
      method: 'GET'
      // headers: {
      //     // 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, 
      //     // "Access-Control-Allow-Origin": '*',
      //     // mode: "no-cors",
      //     'Content-Type': 'application/json'
      // }
  }) 
    .then(response => response.json())
      .then(data => {
        setVehicles(data);
        setLoading(false);
        console.log(vehicles)
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        setLoading(false);
      });
  }, []);

  const openAddModal = () => setAddModalActive(true);


  const openInvoiceModal = () => {
    // setInvoiceModal(true)
  }



  return (
    <div className="main">
      <Header />
      <div className="wrapper">
      <Sidebar />
    <div className="vehicles-container">
      <h1>Последние новости</h1>
      <div class="news-block">
        <div class="news-item">
            <a>Заголовок новости 1</a>
            <p>Краткое описание первой новости...</p>
            <span class="date">05.11.2024</span>
        </div>
        <div class="news-item">
            <a>Заголовок новости 2</a>
            <p>Краткое описание второй новости...</p>
            <span class="date">04.11.2024</span>
        </div>
        {/* <div class="news-item">
            <a>Заголовок новости 3</a>
            <p>Краткое описание второй новости...</p>
            <span class="date">04.11.2024</span>
        </div>
        <div class="news-item">
            <a>Заголовок новости 4</a>
            <p>Краткое описание второй новости...</p>
            <span class="date">04.11.2024</span>
        </div>
        <div class="news-item">
            <a>Заголовок новости 5</a>
            <p>Краткое описание второй новости...</p>
            <span class="date">04.11.2024</span>
        </div>
        <div class="news-item">
            <a>Заголовок новости 6</a>
            <p>Краткое описание второй новости...</p>
            <span class="date">04.11.2024</span>
        </div> */}
    </div>
      <h1>Транспортные средства</h1>
      <div className="controls">
        <button onClick={openAddModal}>Создать</button>
        <input type="text" placeholder="Поиск..." />
        <button onClick={() => setActModalActive(true)}>Получить акт сверки</button>
        <button onClick={() => setInvoiceModalActive(true)}>Получить счет на оплату</button>
      </div>
      <table className="vehicles-table">
        <thead>
          <tr>
            <th>Госномер</th>
            <th>Наименование</th>
            <th>Активен</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Загрузка данных...</td>
            </tr>
          ) : (
            vehicles.map(vehicle => (
              <tr key={vehicle.GUID}>
                <td>{vehicle.gosnumber}</td>
                <td>{vehicle.name}</td>
                <td>{vehicle.active ? 'Активен' : 'Отключен'}</td>

              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

      {addModalActive && (
        <AddModal active={addModalActive} setActive={setAddModalActive}/>
      )}
      
      {invoiceModalActive && (
        <InvoiceModal active={invoiceModalActive} setActive={setInvoiceModalActive}/>
      )}
      {actModalActive && (
        <ActModal active={actModalActive} setActive={setActModalActive}/>
      )}
    </div>

      <Footer />
    </div>
  );
};

export default Vehicle;
