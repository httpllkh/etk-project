import React, { useEffect, useState } from 'react';
import './Vehicles.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import AddModal from './components/modals/AddModal';
import InvoiceModal from './components/modals/InvoiceModal';
import ActModal from './components/modals/ActModal';
import EditModal from './components/modals/EditModal';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addModalActive, setAddModalActive] = useState(false); 
  const [invoiceModalActive, setInvoiceModalActive] = useState(false);
  const [actModalActive, setActModalActive] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);

  const [currentGUID, setCurrentGUID] = useState(null);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://91.203.10.130:2783/portal/hs/ksapi/getTS', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
        }),
      });
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('http://91.203.10.130:2783/portal/hs/ksapi/GETNEWS', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
        }),
      });
      const data = await response.json();
      setNews([data[data.length - 1]]);
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchVehicles();
  }, []);

  const openAddModal = () => setAddModalActive(true);

  const editTs = (guid) => {
    setCurrentGUID(guid);
    setEditModalActive(true);
  };

  return (
    <div className="uppermain">
      <div className="body">
        <Sidebar />
        <div className="main">
          <Header />
          <section className='news-section'>
            <h2>Последние новости</h2>
            {loading ? (
              <p colSpan="3">Загрузка данных...</p>
            ) : (
              news.map(newsItem => (
                <div className="news-item" key={newsItem.GUID}>
                  <h3>{newsItem.Headline}</h3>
                  <p>{newsItem.txt}</p>
                  <span className='date'>{newsItem.dt}</span>
                </div>
              ))
            )}
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
                  <th></th>
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
                      <td>
                        <button className='btn' onClick={() => editTs(vehicle.GUID)}>Редактировать</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
          {editModalActive && (
            <EditModal active={editModalActive} setActive={setEditModalActive} guidid={currentGUID}   onVehicleUpdated={fetchVehicles}  />
          )}
          {addModalActive && (
            <AddModal active={addModalActive} setActive={setAddModalActive} onVehicleAdded={fetchVehicles} />
          )}
          {invoiceModalActive && (
            <InvoiceModal active={invoiceModalActive} setActive={setInvoiceModalActive} />
          )}
          {actModalActive && (
            <ActModal active={actModalActive} setActive={setActModalActive} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vehicle;
