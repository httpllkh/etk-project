import React, { useEffect } from 'react';
import './ErrorToast.css';

// Компонент Toast
const ErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Закрыть уведомление через 3 секунды
    return () => clearTimeout(timer); // Очистить таймер при размонтировании
  }, [message, onClose]); // Таймер сбрасывается, если меняется сообщение

  return (
    <div className="error-toast">
      <p>{message}</p>
    </div>
  );
};

export default ErrorToast;