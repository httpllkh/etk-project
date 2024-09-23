import React from "react";
import axios from "axios";

const FerryPage = () => {

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://example.com/api/history");
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка получения истории переправ:", error);
    }
  };

  const requestPermission = async () => {
    try {
      const response = await axios.post("http://example.com/api/permission", {
        date: new Date().toISOString()
      });
      console.log("Разрешение получено:", response.data);
    } catch (error) {
      console.error("Ошибка получения разрешения:", error);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axios({
        url: "http://example.com/api/report", // URL запроса на получение PDF отчета
        method: "GET",
        responseType: "blob" // Ожидаем, что сервер вернет бинарные данные (PDF)
      });

      // Создаем ссылку на скачивание PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf"); // Устанавливаем название файла
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Ошибка при скачивании отчета:", error);
    }
  };

  return (
    <div className="ferry-container">
        <img src="./public/logo.svg" alt="" />
      <h1>Управление переправами</h1>
      <div className="button-container">
        <button onClick={fetchHistory}>Посмотреть историю переправ</button>
        <button onClick={requestPermission}>Получить разрешение (дата и время)</button>
        <button onClick={downloadReport}>Получить отчет (PDF)</button>
      </div>
    </div>
  );
};

export default FerryPage;