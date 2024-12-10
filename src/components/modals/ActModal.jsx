import React, { useState } from 'react';
import './Model.css'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ActModal = ({active, setActive}) => {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const getAct = () => {
      fetch('http://91.203.10.130:2783/portal/hs/ksapi/GETAKTSVERKI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
          dt1: startDate,
          dt2: endDate
        })  
    }) 
      .then(response => response.arrayBuffer()) // Получаем данные как ArrayBuffer
      .then(buffer => {
          const blob = new Blob([buffer], { type: 'application/pdf' }); // Указываем MIME-тип для PDF
          const url = URL.createObjectURL(blob);
  
          // Открываем новый таб или окно с PDF
          window.open(url, '_blank');
  
          // Опционально: Освобождаем URL после использования
          URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Ошибка:', error));
    }


    const handleSubmit = () => {
      getAct()
      setActive(false);
      };
    
      const handleSaveAndClose = () => {

        setActive(false);
      };

    console.log(active)
    return(
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleSaveAndClose}>&times;</span>
                <h2>Получить акт сверки</h2>
                <form className='form-modal'>
                  <div className='modal_input_form'>
                    <label>Период от</label>
                    <DatePicker
                    className='date-picker'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                    showTimeSelect={false}/>
                  </div>
                  <div className='modal_input_form'>
                    <label>Период до</label>
                    <DatePicker
                    className='date-picker'
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd.MM.yyyy"
                    showTimeSelect={false}/>
                  </div>
                  <div className="modal-buttons">
                    <button className='btn' type="button" onClick={handleSubmit}>Отправить</button>
                  </div>
                </form>
              </div>
            </div>
            

    )
}

export default ActModal

