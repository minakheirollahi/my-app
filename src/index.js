function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function showWeatherCondition(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `humidity : ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `wind : ${Math.round(response.data.wind.speed)}Km/h`;

  document.querySelector("#description").innerHTML = Math.round(
    response.data.weather[0].main
  );
}
function searchCity(city) {
  let apiKey = "fd6a93ef02e229842c138dd4375f5a50";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
  let city = document.querySelector("#city-input");
  city.innerHTML = city;
}

function searchLocation(position) {
  let apiKey = "fd6a93ef02e229842c138dd4375f5a50";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Tehran");
