import React, { useState } from 'react';

const ActModal = ({active, setActive}) => {

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
    
      const handleSaveAndClose = () => {
        handleSubmit();
        setActive(false);
      };

    console.log(active)
    return(
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setActive(false)}>&times;</span>
                <h2>Получить акт сверки</h2>
                <form className='form-modal'>
                  <div className='modal_input_form'>
                    <label>Период от</label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='modal_input_form'>
                    <label>Период до</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-buttons">
                    <button type="button" onClick={handleSaveAndClose}>Отправить</button>
                  </div>
                </form>
              </div>
            </div>
            

    )
}

export default ActModal

