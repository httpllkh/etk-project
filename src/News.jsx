import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import './News.css';

const News = () => {
return (
    <div className="main">
        <Header />
    <div className="wrapper">
    <Sidebar />
    <div class="news-block">
        <div class="news-item">
            <a href="news1.html">Заголовок новости 1</a>
            <p>Краткое описание первой новости...</p>
            <span class="date">05.11.2024</span>
        </div>
        <div class="news-item">
            <a href="news2.html">Заголовок новости 2</a>
            <p>Краткое описание второй новости...</p>
            <span class="date">04.11.2024</span>
        </div>
    </div>
  </div>
    </div>
  );


}

export default News