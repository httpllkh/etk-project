import React, { useState } from 'react';
import './Model.css'; 

const InvoiceModal = ({active, setActive}) => {

  const getInvoice = () => {
    fetch('http://91.203.10.130:2783/portal/hs/ksapi/getinvoice', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth: localStorage.getItem('jwtToken'),
        summa: formData.code
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

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        active: false,
      });

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value
        }));
      };

    
      const handleSaveAndClose = () => {
        getInvoice()
        setActive(false);
      };

    console.log(active)
    return(
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setActive(false)}>&times;</span>
                <h2>Сумма счета</h2>
                <form className='form-modal'>
                  <div className='modal_input_form'>
                    <label>Сумма (в рублях)</label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-buttons">
                    <button className='btn' type="button" onClick={handleSaveAndClose}>Отправить</button>
                  </div>
                </form>
              </div>
            </div>
    )
}

export default InvoiceModal

