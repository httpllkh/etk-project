import React, { useState } from 'react';
import './Model.css'; 

const AddModal = ({ active, setActive, onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveAndClose = async () => {
    try {
      await fetch('https://etk861c.ru:2784/portal/hs/ksapi/newts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
          code: formData.code,
          name: formData.name,
          active: formData.active
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      onVehicleAdded(); // Вызов обновления списка
      setActive(false); // Закрытие модального окна
    } catch (error) {
      console.error('Ошибка при добавлении ТС:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setActive(false)}>&times;</span>
        <h2>Добавить ТС</h2>
        <form className='form-modal'>
          <div className='modal_input_form'>
            <label>Госномер</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <div className='modal_input_form'>
            <label>Наименование</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='modal_checkbox'>
              Активен
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-buttons">
            <button className='btn' type="button" onClick={handleSaveAndClose}>Записать</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
