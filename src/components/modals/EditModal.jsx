import React, { useState } from 'react';
import './Model.css'; 

const EditModal = ({active, setActive, guidid, onVehicleUpdated}) => {

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

    const handleSubmit = () => {
        console.log('Сохраненные данные:', formData);
      
      };
    
      const handleSaveAndClose = async () => {
        await fetch('http://91.203.10.130:2783/portal/hs/ksapi/CORTS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            auth: localStorage.getItem('jwtToken'),
            guid: guidid,
            code: formData.code,
            name: formData.name,
            active: formData.active
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        handleSubmit();
        onVehicleUpdated(); // Вызов обновления списка
        setActive(false); // Закрытие модального окна
      };

    return(
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
            

    )
}

export default EditModal

