
let cityInput=document.getElementById("city_input"), 
searchBtn= document.getElementById("searchBtn"),
api_key=`ac64a77b08574a20d60bc5aa988224c3`;

function getWeatherDetails(name, lat, lon, country, state){
  let For_API=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`,
  weather_API=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`,
  days=[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
     'Saturday'
    
  ],
  months= [
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
  fetch(weather_API).then(res => res.json()).then(data =>{
       console.log(data);
       
  }).catch(() =>{
    alert('Failed to fetch current weather');
  } )

}


function getCityCoordinates(){
  let cityName= cityInput.value.trim();
  cityInput.value='';
  if(!cityName) return;
  let GEOcodingURL=`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOcodingURL).then(res => res.json()).then(data => {
    let {name, lat, lon, country, state} =data[0];
    getWeatherDetails(name, lat, lon, country, state);
  }).catch(() => {
    alert(`failed to fetch coordinates of ${cityName}`)
  })
}
searchBtn.addEventListener('click', getCityCoordinates);
 
