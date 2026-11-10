import { API_KEY } from './config.js';

const url = `https://api.openweathermap.org/data/2.5/weather?q=Casablanca&units=metric&appid=${API_KEY}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));