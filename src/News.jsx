import React, { useEffect, useState } from 'react';
import './Vehicles.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';


const Vehicle = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchNews = async () => {
    try {
      const response = await fetch('https://etk861c.ru:2784/portal/hs/ksapi/GETNEWS', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth: localStorage.getItem('jwtToken'),
        }),
      });
      const data = await response.json();
      setNews(data);
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);





  return (
    <div className="uppermain">
      <div className="body">
        <Sidebar isVehicle={false} isNews={true} isDetail={false}/>
        <div className="main">
          <Header />
          <section className='news-section'>
            <h2>Последние новости</h2>
            {loading ? (
              <p colSpan="3">Загрузка данных...</p>
            ) : (
              news.map(newsItem => (
                <div className="news-item" key={newsItem.GUID}>
                  <h3>{newsItem.Headline}</h3>
                  <p>{newsItem.txt}</p>
                  <span className='date'>{newsItem.dt}</span>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vehicle;
