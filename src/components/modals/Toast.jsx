import React, { useEffect } from 'react';
import './Toast.css';

// Компонент Toast
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Закрыть уведомление через 3 секунды
    return () => clearTimeout(timer); // Очистить таймер при размонтировании
  }, [message, onClose]); // Таймер сбрасывается, если меняется сообщение

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;