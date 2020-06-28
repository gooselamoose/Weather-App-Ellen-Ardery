function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#current-weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  //let city = document.querySelector("#city-text-input").value;
  let apiKey = "273e469f94d2f405eb0d10738f64c57c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "273e469f94d2f405eb0d10738f64c57c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

function showTime() {}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature * 9) / 5) * 32);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  console.log(forecast);
  // let minTemp = forecast.main.temp_min;
  //let maxTemp = forecast.main.temp_max;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-2 time">
              ${formatHours(forecast.dt * 1000)}
              <div class="row">
                <div class="col">
                <img src= "http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png" />
                </div>
              </div>
              <div class="row">
                <div class="col temp">
                 ${Math.round(forecast.main.temp_min)}º | <strong>${Math.round(
      forecast.main.temp_max
    )}º</strong>
                 </div>
              </div>
          </div>

          `;
  }
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let now = new Date();

console.log(now.getDay());
console.log(now.getDate());
console.log(now.getMonth());
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getFullYear());

let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let thedate = document.querySelector("#date");
thedate.innerHTML = `${day}. ${date} ${month}`;

searchCity("Hamburg");

//  let apiKey = "278a50a374e71449a4ee420e8baaf002";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric

//https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric

/*function showCity(event) {
  event.preventDefault();
  let displayCity = document.querySelector("#city");
  let changeCity = document.querySelector("#city-text-input");
  if (changeCity.value) {
    displayCity.innerHTML = `${
      changeCity.value.charAt(0).toUpperCase() + changeCity.value.slice(1)
    }`;
    searchCity(showCity.value);
  } else {
    displayCity.innerHTML = null;
    alert("Search for a city...");
  }
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity);

function findCity(city) {
  let apiKey = "278a50a374e71449a4ee420e8baaf002";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}


function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weather-type");
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-text-input");
  if (cityInput.value) {
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
  } else {
    cityElement.innerHTML = null;
    alert("Search for a city...");
  }
}

let apiKey = "273e469f94d2f405eb0d10738f64c57c";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Hamburg&units=metric&appid=${apiKey}";

axios.get(apiUrl).then(showWeather);
*/
