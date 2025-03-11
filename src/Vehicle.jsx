import React, { useEffect, useState } from 'react';
import './Vehicles.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AddModal from './components/modals/AddModal';
import InvoiceModal from './components/modals/InvoiceModal';
import ActModal from './components/modals/ActModal';
import EditModal from './components/modals/EditModal';

import ErrorToast from './components/modals/ErrorToast';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addModalActive, setAddModalActive] = useState(false); 
  const [invoiceModalActive, setInvoiceModalActive] = useState(false);
  const [actModalActive, setActModalActive] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);

  //toast
  const [showErrorToast, setShowErrorToast] = useState(false)
  const [errorToastContent, setErrorToastContent] = useState('')

  // edit
  const [currentGUID, setCurrentGUID] = useState(null);
  const [currentCode, setCurrentCode] = useState(null)
  const [currentName, setCurrentName] = useState(null)
  const [currentActive, setCurrentActive] = useState(null)



  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://etk861c.ru:2784/portal/hs/ksapi/getTS', {
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
      const response = await fetch('https://etk861c.ru:2784/portal/hs/ksapi/GETNEWS', {
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

  const editTs = (guid, code, name, active) => {
    setCurrentGUID(guid);
    setCurrentCode(code)
    setCurrentName(name)
    setCurrentActive(active)
    setEditModalActive(true);
  };



  const toggleSwitch = async (guid, code, name, active) => {
    await fetch('https://etk861c.ru:2784/portal/hs/ksapi/CORTS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth: localStorage.getItem('jwtToken'),
        guid: guid,
        code: code,
        name: name,
        active: !active,
      }),
    })
      .then(response => {
        if (response.status === 406) {
          // Ошибка 406 - показываем ErrorToast
          return response.json().then(data => {
            setErrorToastContent(data);
            setShowErrorToast(true);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        // Обновляем только нужный элемент в vehicles, если ошибки нет
        if (data == true) {
          setVehicles(prevVehicles => 
            prevVehicles.map(vehicle => 
              vehicle.GUID === guid ? { ...vehicle, active: !active } : vehicle
            )
          );
        }

      })
      .catch(error => {
        console.error('Ошибка при переключении состояния:', error);
      });
  };
  
  
  

  return (
    <div className="uppermain">
      <div className="body">
        <Sidebar isVehicle={true} isNews={false} isDetail={false} />
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
                      <td><div className={`toggle-switch ${vehicle.active ? 'on' : ''}`} onClick={() => {toggleSwitch(vehicle.GUID, vehicle.gosnumber, vehicle.name, vehicle.active)}}>
                          <div className="toggle-knob"></div>
                        </div>
                      </td>
                      <td>
                        <button className='btn' onClick={() => editTs(vehicle.GUID, vehicle.gosnumber, vehicle.name, vehicle.active)}>Редактировать</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
          {editModalActive && (
            <EditModal active={editModalActive} setActive={setEditModalActive} guidid={currentGUID}   onVehicleUpdated={fetchVehicles} codeProp={currentCode} nameProp={currentName} activeProp={currentActive} setErrorToast={setShowErrorToast} setErrorToastContent={setErrorToastContent}/>
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
      {showErrorToast && <ErrorToast message={errorToastContent} onClose={() => setShowErrorToast(false)} />}
      <Footer />
    </div>
  );
};

export default Vehicle;
