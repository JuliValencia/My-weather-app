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

function showWeather(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = `34ae1065362d42545661451bda2b8a1f`;
  let city = document.querySelector(`#search-text-input`).value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);
