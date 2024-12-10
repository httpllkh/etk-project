import React, { useEffect, useState } from 'react';
import './Detail.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [detalisation, setDetalisation] = useState([])


  const date = new Date();
  const [startDate, setStartDate] = useState(new Date(`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`));
  const [endDate, setEndDate] = useState(new Date(`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`));
useEffect(() => {
  const fetchDetail = async () => {
    try {
      const response = await fetch('http://91.203.10.130:2783/portal/hs/ksapi/GETJURNAL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
        }),
      });   
      const data = await response.json();
      setDetalisation(data)
      console.log(data);
      console.log(startDate)
      console.log(endDate)
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
    }
  };

  fetchDetail()
}, [])

  const getJournalFile = async () => {
    await fetch('http://91.203.10.130:2783/portal/hs/ksapi/GETJURNALFILE', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth: localStorage.getItem('jwtToken'),
        dt1: startDate,
        dt2: endDate
      }),
    }).then(response => response.arrayBuffer())
    .then(buffer => {
      const blob = new Blob([buffer])
      const link = document.createElement('a');
      
      // Создаём URL для Blob
      const url = window.URL.createObjectURL(blob);
      
      // Создаём ссылку для скачивания
      link.href = url;
      link.download = 'detalisation.xlsx'; // Указываем имя файла
      link.click(); // Имитируем клик по ссылке

      // Освобождаем URL после использования
      window.URL.revokeObjectURL(url);
    })
  }

  return (
    <div className="uppermain">
      <div className="body">
        <Sidebar isVehicle={false} isNews={false} isDetail={true} />
        <div className="main">
          <Header />
        <section className='detail-section'>
            <h2>Транспортные средства</h2>
            <div className="detail-actions">
                <DatePicker
                    className='date-picker'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                    showTimeSelect={false} // Скрывает время
                />
                <DatePicker
                    className='date-picker'
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd.MM.yyyy"
                    showTimeSelect={false} // Скрывает время
                />
              <button className='btn' onClick={getJournalFile}>Детализация EXCEL</button>
            </div>
            <h2>История (последние 50 переправ)</h2>
            <table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Масса</th>
                  <th>Номер</th>
                  <th>Имя</th>
                  <th>Код</th>
                  <th>Тариф</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3">Выберите временной отрезок</td>
                  </tr>
                ) : (
                  detalisation.map(vehicle => (
                    <tr key={vehicle.Номер}>
                      <td>{vehicle.Дата}</td>
                      <td>{vehicle.Масса}т</td>
                      <td>{vehicle.Номер}</td>
                      <td>{vehicle.ТСИмя}</td>
                      <td>{vehicle.ТСКод}</td>
                      <td>{vehicle.Тариф}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
