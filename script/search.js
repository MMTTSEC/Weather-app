import config from './config.js'; 
const apiKey = config.weatherApiKey; 



// Get weather data 
function fetchWeather() {
  let city = document.getElementById("cityInput").value.trim();
  let errorMessage = document.getElementById("errorMessage");
  document.getElementById("forecastToggle").checked = false;
  document.getElementById("forecastWidget").style.display = "none";
  sessionStorage.removeItem("forecastData");
    // input validation
  if (city === "") {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.style.display = "block"; 
    document.getElementById("weatherWidget").style.display = "none";
    return; 
  } else {
    errorMessage.style.display = "none"; 
  }

  // URL for current weather data
  let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      displayError(data.error.message); // Show error from the API response
    } else {
      sessionStorage.setItem("weatherData", JSON.stringify(data));
      displayCurrentWeather(data); // Show weather data if no error
    }
  })
  

}

// Show current weather data
function displayCurrentWeather(data) {
  document.getElementById("weatherWidget").style.display = "block";
  
  // Display data to the html elements
  document.getElementById("cityName").textContent = data.location.name;
  document.getElementById("temperature").textContent = data.current.temp_c + "°C";
  document.getElementById("condition").textContent = data.current.condition.text;
  document.getElementById("wind").textContent = "Wind: " + data.current.wind_kph + " km/h";
  document.getElementById("humidity").textContent = "Humidity: " + data.current.humidity + "%";
  document.getElementById("time").textContent = "Local time: " + data.location.localtime.split(" ")[1];
  document.getElementById("weatherIcon").src = "https:" + data.current.condition.icon;
}

// Show error message
function displayError(message) {
  let errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  document.getElementById("weatherWidget").style.display = "none";
}
window.fetchWeather = fetchWeather;
window.toggleForecast=toggleForecast;

 // Load stored data if available
 function loadStoredWeather() {
  const storedWeatherData = sessionStorage.getItem("weatherData");
  if (storedWeatherData) {
    displayCurrentWeather(JSON.parse(storedWeatherData));
  }
}

//  toggle for forecast
function toggleForecast() {
    const isChecked = document.getElementById("forecastToggle").checked;
    let city = document.getElementById("cityInput").value.trim();
  
    if (isChecked) {
      fetchForecast(city);
      document.getElementById("weatherWidget").style.display = "none";
    } else {
      fetchWeather();
      document.getElementById("forecastWidget").style.display = "none"; 
    }
    
  }
  
  //forecast for 3 days
  function fetchForecast(city) {
    
      
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=3&q=${city}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          displayError(data.error.message);
        } else {
          sessionStorage.setItem("forecastData", JSON.stringify(data)); 
          displayForecast(data);
        }
      });
      
  }
  
  // Display the 3-day forecast
  function displayForecast(data) {
    document.getElementById("weatherWidget").style.display = "none"; // Hide current weather
    document.getElementById("forecastWidget").style.display = "block"; // Show forecast
  
    // Loop through 3 days 
    for (let i = 0; i < 3; i++) {
      document.getElementById(`date-${i+1}`).textContent = data.forecast.forecastday[i].date;
      document.getElementById(`icon-${i+1}`).src = "https:" + data.forecast.forecastday[i].day.condition.icon;
      document.getElementById(`condition-${i+1}`).textContent = data.forecast.forecastday[i].day.condition.text;
      document.getElementById(`temp-${i+1}`).textContent = data.forecast.forecastday[i].day.avgtemp_c + "°C";
    }
  }
  
 
  // Load forecast if available
function loadStoredForecast() {
  const storedForecastData = sessionStorage.getItem("forecastData");
  if (storedForecastData) {
    displayForecast(JSON.parse(storedForecastData));
  }
}

// Run when page load
window.addEventListener("load", () => {
  loadStoredWeather();
  loadStoredForecast();
});