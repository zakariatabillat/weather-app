let cityInput=document.getElementById("city_input"),
searchBtn= document.getElementById("searchBtn"),
api_key=`ac64a77b08574a20d60bc5aa988224c3`,
currentWeatherCard =document.querySelectorAll(".weather-left .card")[0],
fiveDaysForcastCard= document.querySelectorAll(".day-forecast");

const days=[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
     'Saturday'
];
const months= [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

async function fetchJson(url){
  const response=await fetch(url);
  const data=await response.json();
  if(!response.ok){
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

async function getWeatherDetails(name, lat, lon, country){
  const For_API=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`,
  weather_API=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
  try{
    const data=await fetchJson(weather_API);
    const date=new Date();
    currentWeatherCard.innerHTML=`<div class="current-weather">
                    <div class="details">
                        <p>Now</p>
                        <h2>${data.main.temp.toFixed(2)}&deg;C</h2>
                        <p>${data.weather[0].description}</p>
                    </div>
                    <div class="weather-icon">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="cloud icon">
                    </div>
                </div>
                <hr>
                <div class="card-footer">
                    <p><i class="fa-light fa-calendar">${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}</i></p>
                    <p><i class="fa-light fa-location-dot"></i>${name}, ${country}</p>
                </div>`;
  }catch(error){
    alert(`Unable to load current weather: ${error.message}`);
  }
  try{
    const data=await fetchJson(For_API);
    let uniqueForcastDays= [];
    let fiveDaysForcast= data.list.filter(forecast => {
      let forcastDate= new Date(forecast.dt_txt).toDateString();
      if(!uniqueForcastDays.includes(forcastDate)){
        uniqueForcastDays.push(forcastDate);
        return true;
      }
      return false;
    })
    fiveDaysForcastCard.forEach(card => card.innerHTML='');
    for(let i=1; i<fiveDaysForcast.length && i<=fiveDaysForcastCard.length;i++){
      let date = new Date(fiveDaysForcast[i].dt_txt);
      fiveDaysForcastCard[i-1].innerHTML=` <div class="forecast-item">
                        <div class="icon-wrapper">
                            <img src="https://openweathermap.org/img/wn/${fiveDaysForcast[i].weather[0].icon}.png" alt="cloud icon">
                            <span>${fiveDaysForcast[i].main.temp.toFixed(2)}&deg;C</span>
                        </div>
                        <p>${date.getDate()} ${months[date.getMonth()]}</p>
                        <p>${days[date.getDay()]}</p>

                    </div>`;
    }
  }catch(error){
    alert(`Failed to fetch weather forecast: ${error.message}`);
  }
}


async function getCityCoordinates(){
  const cityName= cityInput.value.trim();
  cityInput.value='';
  if(!cityName) return;
  const GEOcodingURL=`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${api_key}`;
  try{
    const data=await fetchJson(GEOcodingURL);
    if(data.length===0){
      alert(`No location found for "${cityName}".`);
      return;
    }
    const {name, lat, lon, country} =data[0];
    await getWeatherDetails(name, lat, lon, country);
  }catch(error){
    alert(`Unable to fetch coordinates for "${cityName}": ${error.message}`);
  }
}
searchBtn.addEventListener('click', getCityCoordinates);
 
