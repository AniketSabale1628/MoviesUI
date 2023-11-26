import React, { useEffect, useState } from "react";
import "./Climat.css";
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import imgage1 from "../assets/image 14.png";
import { async } from "rxjs";
import Stopwatch from "../components/Stopwatch";
import { useNavigate } from "react-router-dom";
const Climat = () => {
  const [localStorageArray, setLocalStorageArray] = useState([]);
  const [localStorageCategotyArray, setLocalStorageCategotyArray] = useState(
    []
  );
  useEffect(() => {
    const serializedArray = localStorage.getItem("formData");
    if (serializedArray) {
      const parsedArray = JSON.parse(serializedArray);
      setLocalStorageArray(parsedArray);
    }
  }, []);

  useEffect(() => {
    const serializedCategoryArray = localStorage.getItem("selectedCategories");
    if (serializedCategoryArray) {
      const parsedArray = JSON.parse(serializedCategoryArray);
      setLocalStorageCategotyArray(parsedArray);
    }
  }, []);
  
  const Arr = [...localStorageCategotyArray];

  useEffect(() => {
    let Api_Key = "2e3026961fc9293249a138dcb0b49579";

    async function WeatherApp() {
      var url = `https://api.openweathermap.org/data/2.5/weather?q=Pune&units=Metric&appid=${Api_Key}`;
      var responce = await fetch(url);
      var data = await responce.json();
      const Wtemparature = document.querySelector(".temp");
      const Wind = document.querySelector(".wind");
      const Humidity = document.querySelector(".humidiy");
      const pressure = document.querySelector(".pressure");
      Wtemparature.innerHTML = data.main.temp + " °C";
      Humidity.innerHTML = data.main.humidity + "%";
      Wind.innerHTML = data.wind.speed + "km/h";
      pressure.innerHTML = data.main.pressure + "mbar";
      console.log(data.weather[0].main);
    }
    WeatherApp();
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };

    updateDate();

    const intervalId = setInterval(updateDate, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = "8f154b23e7f74870a764e74a3bf58f6c";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setNews(data.articles[0]);
        } else {
          console.error("No articles found in the API response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  const Navigate = useNavigate();

  function BrowserEvent() {
    Navigate("/Browser");
  }

  return (
    <div>
      <div className="Climat">
        <div>
          <div className="left">
          
            <div className="mbox">
              <div className="song">
                <div>
                  <img src={imgage1} className="earphone"></img>
                </div>
                <div className="naam">
                  <div className="firstName">{localStorageArray.Name}</div>
                  <div className="firstName">{localStorageArray.Email}</div>
                  <div className="firstName">{localStorageArray.UserName}</div>
                  <div className="map">
                    {Arr.map((data, index) => (
                      <div>
                        <div className="Categor" key={index}>
                          <p className="ca">{data}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="temparature">
                <div className="date_time">
                  <div className="date">{date}</div>
                  <div className="time">{time}</div>
                </div>

                <div className="weather">
                  <div className="rainy">
                    <p>
                      <div>
                        <WiThunderstorm className="thunder" />
                      </div>
                      <p className="po1">Heavy rain</p>
                    </p>
                  </div>

                  <div className="line"></div>

                  <div className="tepr1">
                    <div className="temp"></div>
                    <p>
                      <div className="pressure"></div>
                      <p className="po">Pressure</p>
                    </p>
                  </div>

                  <div className="line"></div>

                  <div className="tepr">
                    <p>
                      <div className="wind"></div>
                      <p className="po">Wind</p>
                    </p>
                    <p>
                      <div className="humidiy"></div>
                      <p className="po">Humidiy</p>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="notes">
              <div className="typeN">All notes</div>
              <textarea className="bord"></textarea>
            </div>
          </div>

          <div className="stopWatch">
            <Stopwatch />
            <div></div>
          </div>
        </div>

        <div className="mount">
          <ul>
            <div className="poss">
              <img
                src={news.urlToImage}
                alt={news.title}
                className="newsImg"
              ></img>
              <div className="news_title_">
                <h3>{news.title}</h3>
                <span className="ssd">{date + " |"}</span>
                <span className="ssd">{" " + time}</span>
              </div>
            </div>

            <p>{news.description}</p>
          </ul>
        </div>

        <button onClick={BrowserEvent} className='Browser'>Browser</button>

      </div>
    </div>
  );
};

export default Climat;

