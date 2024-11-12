import React, { useState } from 'react';

const AddModal = ({active, setActive}) => {

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
                    <label>
                      <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                      />
                      Активен
                    </label>
                  </div>
                  <div className="modal-buttons">
                    <button type="button" onClick={handleSaveAndClose}>Записать</button>
                  </div>
                </form>
              </div>
            </div>
            

    )
}

export default AddModal

