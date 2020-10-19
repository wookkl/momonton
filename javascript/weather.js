const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEY = "0a5713693f32337a65860ad7cd5ee78f";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temerature = json.main.temp;
      const place = json.name;
      const span = document.createElement("span");
      const weatherIs = document.createElement("span");
      const icon = document.createElement("img");
      const src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      console.log(json.weather[0]);
      icon.src = src;
      weatherIs.innerText = `Today weather is ${json.weather[0].main}~!`;
      span.innerText = `${Math.floor(temerature)}°C @ ${place}`;
      weather.appendChild(span);
      weather.appendChild(weatherIs);
      weather.appendChild(icon);
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSeccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Cant access geo location ");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSeccess, handleGeoError);
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}

init();
