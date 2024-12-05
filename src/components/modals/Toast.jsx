import React, { useState, useEffect } from 'react';
import './Toast.css';

// Компонент Toast
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Закрыть уведомление через 3 секунды
    return () => clearTimeout(timer); // Очистить таймер при размонтировании
  }, [onClose]);

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;