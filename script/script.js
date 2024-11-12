
// Array of Swedish cities
const citiesSweden = [
  "Borås",
  "Gävle",
  "Göteborg",
  "Helsingborg",
  "Jönköping",
  "Linköping",
  "Lund",
  "Malmö",
  "Norrköping",
  "Södertälje",
  "Stockholm",
  "Umeå",
  "Uppsala",
  "Västerås",
  "Örebro",
];

// Array of Rwandan cities
const citiesRwanda = [
  "Kigali",
  "Butare",
  "Musanze",
  "Rubavu",
  "Gisenyi",
  "Huye",
  "Nyagatare",
  "Ruhengeri",
  "Kayonza",
  "Rwamagana",
];

// Function to populate the dropdown for a specific widget
function populateDropdown(cityDropdownId, cities, widgetId) {
    const dropdown = document.getElementById(cityDropdownId);
    dropdown.innerHTML = ""; // Clear previous options if any
    cities.forEach(city => {
        const cityItem = document.createElement("li");
        const cityLink = document.createElement("a");
        cityLink.className = "dropdown-item";
        cityLink.href = "#";
        cityLink.textContent = city;
        cityLink.onclick = () => {
            fetchWeather(city, widgetId);
        };
        cityItem.appendChild(cityLink);
        dropdown.appendChild(cityItem);
    });
}

// Function to fetch weather data for a specific city and update a specific widget
function fetchWeather(city, widgetPrefix) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            // Get data from the API response
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;
            const location = data.location.name;
            const icon = data.current.condition.icon;
            const wind = data.current.wind_kph;
            const humidity = data.current.humidity;
            
            document.getElementById(`cityName${widgetPrefix}`).textContent = location;
            document.getElementById(`temperature${widgetPrefix}`).textContent = `${temperature}°C`;
            document.getElementById(`condition${widgetPrefix}`).textContent = condition;
            document.getElementById(`wind${widgetPrefix}`).textContent = `Wind: ${wind} km/h`;
            document.getElementById(`humidity${widgetPrefix}`).textContent = `Humidity: ${humidity}%`;
            document.getElementById(`time${widgetPrefix}`).textContent = `Local time: ${data.location.localtime.split(" ")[1]}`;
            document.getElementById(`weatherIcon${widgetPrefix}`).src = `https:${icon}`;

            // Update the time
            const currentTime = new Date().toLocaleTimeString();
            document.getElementById(`time${widgetPrefix}`).textContent = currentTime;
        })
        .catch(error => {
            document.getElementById(`cityName${widgetPrefix}`).textContent = "Error fetching data";
        });
}

// Populate dropdowns for both widgets
populateDropdown("cityDropdownSweden", citiesSweden, "Sweden");
populateDropdown("cityDropdownRwanda", citiesRwanda, "Rwanda");

// Initial weather fetch for each widget (optional, for default display)
fetchWeather("Linköping", "Sweden");
fetchWeather("Kigali", "Rwanda");