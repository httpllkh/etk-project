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
    console.log(localStorage.getItem('jwtToken'))
    const fetchData = async () => {
      await fetch('http://91.203.10.130:2783/portal/hs/ksapi/getTS', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, 
            'Content-Type': 'application/json'
        }
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
    }
    fetchData()
  }, []);

  const openAddModal = () => setAddModalActive(true);


  const openInvoiceModal = () => {
    // setInvoiceModal(true)
  }



  return (
    <div className="uppermain">
    <div className="body">
      <Sidebar />
      <div className="main">
      <Header />

      <section className='news-section'>
      <h2>Последние новости</h2>
        <div class="news-item">
            <h3>Заголовок новости 1</h3>
            <p>Краткое описание первой новости...</p>
            <span class="date">05.11.2024</span>
        </div>
        <div class="news-item">
            <h3>Заголовок новости 2</h3>
            <p>Краткое описание второй новости...</p>
            <span class="date">04.11.2024</span>
        </div>
      </section>
    <section className='transport-section'>
      <h2>Транспортные средства</h2>
      <div className="actions">
        <button className='btn' onClick={openAddModal}>Создать</button>
        <input type="text" placeholder="Поиск..." className='search-bar' />
        <button className='btn' onClick={() => setActModalActive(true)}>Получить акт сверки</button>
        <button className='btn' onClick={() => setInvoiceModalActive(true)}>Получить счет на оплату</button>
      </div>
      <table>
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
      </section>


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

    </div>
    <Footer />
    </div>



    
  );
};

export default Vehicle;
