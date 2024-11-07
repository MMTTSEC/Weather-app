  // Array of Swedish cities (Can be changed to retrieve cities from API later)
  const cities = [
    "Borås", "Gävle", "Gothenburg", "Helsingborg", "Jönköping", "Linköping", 
    "Lund", "Malmö", "Norrköping", "Södertälje", "Stockholm", "Umeå", "Uppsala", 
    "Västerås", "Örebro"
  ];

  // Adds cities to the dropdown menu
  const cityDropdown = document.getElementById('cityDropdown');
  cities.forEach(city => {
    const cityItem = document.createElement('li');
    cityItem.innerHTML = `<a class="dropdown-item" href="#">${city}</a>`;
    cityDropdown.appendChild(cityItem);
  });