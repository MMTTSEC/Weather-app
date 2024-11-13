import config from "./config.js";
const apiKey = config.weatherApiKey;

// Array of Swedish cities
const citiesSweden = [
  "Jönköping",
  "Linköping",
  "Norrköping",
  "Stockholm",
  "Umeå",
];
// Array of Rwandan cities
const citiesRwanda = [
  "Butare",
  "Huye",
  "Kigali",
  "Kayonza",
  "Musanze",
];

// Initial weather fetch for each widget
fetchAndDisplayWeather("Linköping", "Sweden");
fetchAndDisplayWeather("Kigali", "Rwanda");

// Populate dropdowns for both widgets
populateDropdown("dropdownSwedishWidget", citiesSweden, "Sweden");
populateDropdown("dropdownRwandanWidget", citiesRwanda, "Rwanda");

// Function to populate the dropdown for a specific widget
function populateDropdown(dropdownId, cities, country) {
  const dropdown = document.getElementById(dropdownId);
  cities.forEach((city) => {
    const cityItem = document.createElement("li");
    const cityLink = document.createElement("a");
    cityLink.className = "dropdown-item";
    cityLink.href = "#";
    cityLink.textContent = city; //Sets visible text to links name
    cityLink.onclick = () => {
      //When choosing a city from the dropdown
      fetchAndDisplayWeather(city, country); 

      // Save selected city to session storage
      sessionStorage.setItem(`selectedCity${country}`, city);
    };
    cityItem.appendChild(cityLink); //Inserts the link into the list item
    dropdown.appendChild(cityItem); //Adds the list item to the dropdown menu
  });
}

// Function to fetch weather data for a specific city and update a specific widget
function fetchAndDisplayWeather(city, country) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then((response) => response.json())
    .then((data) => {
      // Get data from the API response
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;
      const location = data.location.name;
      const icon = data.current.condition.icon;
      const wind = data.current.wind_kph;
      const humidity = data.current.humidity;

      document.getElementById(`cityName${country}`).textContent = location;
      document.getElementById(`temperature${country}`).textContent = `${temperature}°C`;      
      document.getElementById(`condition${country}`).textContent = condition;
      document.getElementById(`wind${country}`).textContent = `Wind: ${wind} km/h`;
      document.getElementById(`humidity${country}`).textContent = `Humidity: ${humidity}%`;
      document.getElementById(`time${country}`).textContent = `Local time: ${data.location.localtime}`;
      document.getElementById(`weatherIcon${country}`).src = `https:${icon}`;

      // Update the time
      const currentTime = new Date().toLocaleTimeString();
      document.getElementById(`time${country}`).textContent = currentTime;
    })
    .catch((error) => {
      document.getElementById(`cityName${country}`).textContent =
        "Error fetching data";
    });
}

// On page load, check for the stored selected city
window.addEventListener("load", () => {
  const selectedCitySweden = sessionStorage.getItem("selectedCitySweden");
  const selectedCityRwanda = sessionStorage.getItem("selectedCityRwanda");

  // If a city is stored, fetch its weather data  
  if (selectedCitySweden) {
    fetchAndDisplayWeather(selectedCitySweden, "Sweden");
  }
  if (selectedCityRwanda) {
    fetchAndDisplayWeather(selectedCityRwanda, "Rwanda");
  }
});
