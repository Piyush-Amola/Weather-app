const apiKey = "f95783ab7b8a7b3e96496b85a78aedd1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    const data = await response.json();

    if (response.status !== 200) {
      alert(data.message || "City not found or data is incomplete");
      return;
    }

    if (!data.main || !data.weather || !data.weather[0]) {
      alert("Weather data is incomplete or missing.");
      return;
    }

    const temperature = data.main.temp;
    if (typeof temperature !== "number" || isNaN(temperature)) {
      alert("Invalid temperature data received.");
      return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(temperature) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".humidity-title").innerHTML = "Humidity";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".wind-title").innerHTML = "Wind Speed";

    const weatherCondition = data.weather[0].main || "Clear";
    console.log("weather co", weatherCondition === "Clear");
    switch (weatherCondition) {
      case "Clouds":
        console.log(1);
        weatherIcon.src = "./images/cloudy.png";
        break;
      case "Clear":
        console.log(2);
        weatherIcon.src = "./images/sunny.png";
        break;
      case "Rain":
        console.log(3);
        weatherIcon.src = "./images/rain.png";
        break;
      case "Thunderstorm":
        console.log(4);
        weatherIcon.src = "./images/thunderstorm.png";
        break;
      case "Snow":
        console.log(5);
        weatherIcon.src = "./images/snow.png";
        break;
      case "Drizzle":
        console.log(6);
        weatherIcon.src = "./images/heavy-rain.png";
        break;
      default:
        console.log(7);
        weatherIcon.src = "./images/sunny.png";
    }

    document.querySelector(".weather-icon").style.display = "block";
    document.querySelector(".humidity-icon").style.display = "block";
    document.querySelector(".wind-icon").style.display = "block";
    document.querySelector(".humidity-icon").src = "./images/humidity.png";
    document.querySelector(".wind-icon").src = "./images/windy.png";
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    alert("An error occurred while fetching weather data.");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  checkWeather(city);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value.trim();
    checkWeather(city);
  }
});
