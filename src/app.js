let now = new Date();
let currentDateTime = document.querySelector(".current-date-time");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];

let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let month = months[now.getMonth()];
currentDateTime.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}`;

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  return days[day];
}

function showForecast(response) {
  let lowElement = document.querySelector(`#temperature-low`);
  let highElement = document.querySelector(`#temperature-high`);
  lowElement.innerHTML = Math.round(response.data.daily[0].temperature.minimum);
  highElement.innerHTML = Math.round(
    response.data.daily[0].temperature.maximum
  );
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `  <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
    <img
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
      forecastDay.condition.icon
    }.png"
    alt=""
    width="45"
    />
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature-low"> L:${Math.round(
      forecastDay.temperature.minimum
    )}° </div>
        <div class="weather-forecast-temperature-high">H:${Math.round(
          forecastDay.temperature.maximum
        )}°</div>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = `485cb8bac1atfac9f3b46bfdodfc3a40`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector(`#city`);
  let countryElement = document.querySelector(`#country`);
  let temperatureElement = document.querySelector(`#current-temperature`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  let iconElement = document.querySelector(`#weather-icon`);

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.city);
}

function search(city) {
  let apiKey = `485cb8bac1atfac9f3b46bfdodfc3a40`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-text-input");
  search(searchInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

search("Lokeren");
