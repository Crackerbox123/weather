
var userFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search");
var dateHeader = document.querySelector("#date");
var tempCurrent = document.querySelector("#temp");
var windCurrent = document.querySelector("#wind");
var humidCurrent = document.querySelector("#humidity");
var uvCurrent = document.querySelector("#uv");
var cardContainer = document.querySelector("#forecast-container");
var searchHistoryList = [];


// Geolocation API
// get input data from the submit form, saves as location, sends to getLocationData
var formSubmitHandler = function(event) {
    event.preventDefault();
    var location = searchInputEl.value.trim();
    if (location) {
        getLocationData(location);
        searchInputEl.value = "";
    } else {
        alert("Please enter a valid location")
    }
    if (!searchHistoryList.includes(location)) {
        searchHistoryList.push(location);
        var searchedCity = $(`
            <li class="list-group-item">${location}</li>
            `);
        $("#searchHistory").append(searchedCity);
    };
    
    localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);
}

// function to get location data
var getLocationData = function(location) {
    // apiurl, with location parameter from fromSubmitHandler
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&appid=c7c0c5deb67324c42122e65149bc7cda";
    fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
        console.log(data);
        // latitude variable set
        console.log(data[0].lat);
        var latitude = data[0].lat;
        // long variable set
        console.log(data[0].lon);
        var longitude = data[0].lon; 
          
        // lat + lon params sent to getWeather function4
        getWeather(latitude, longitude)

    });
});
};

var getWeather = function(latitude, longitude) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=c7c0c5deb67324c42122e65149bc7cda"
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            // captures response data, names it, and sends to dispalyWeather function as a parameter
            var weather = data;
            displayWeather(weather);
            console.log(weather)
        });
    });
};


// display weather to current section
var displayWeather = function(weather) {

    //console.log(weather);
    // dateHeader.textContent = location;

    //console.log(weather.current.temp);
    tempCurrent.textContent = weather.current.temp + " °F";
    //console.log(weather.current.wind_speed);
    windCurrent.textContent = weather.current.wind_speed + " MPH";
    //console.log(weather.current.humidity);
    humidCurrent.textContent = weather.current.humidity + "%";
    //console.log(weather.current.uvi);
    uvCurrent.textContent = weather.current.uvi;
    displayForecast(weather);

    $(document).on("click", ".list-group-item", function() {
        var listCity = $(this).text();
        getLocationData(listCity);
    });
}


var displayForecast = function(weather) {
    console.log(weather)

    // loop over daily array
    // starts at 1 to have forecast start at tomorrow
    for (var i = 1; i < 6; i++) {

        // create div for card
        var forecastCard = document.createElement("div")
        forecastCard.classList = "forecast-cards"



         // Insert icon and append to card
        var forecastIcon = document.createElement("span");
        var img = new Image();
        img.src = 'http://openweathermap.org/img/wn/' + weather.daily[i].weather[0].icon + '@2x.png' ;



        // create h2 for Date
        // increments date and converts toDateString
        var date = new Date();
        date.setDate(date.getDate() + i);
        var forecastDate = document.createElement("h3");
        forecastDate.classList = "card-content";
        forecastDate.textContent = date.toDateString();

        // create span for temp

        var forecastTemp = document.createElement("span")
        forecastTemp.classList = "card-content";
        forecastTemp.textContent = "Temp: " + weather.daily[i].temp.max + " °F";

        // span for wind
        var forecastWind = document.createElement("span")
        forecastWind.classList = "card-content";
        forecastWind.textContent = "Wind: " + weather.daily[i].wind_speed + " MPH";

        // span for humidity

        var forecastHumid = document.createElement("span")
        forecastHumid.classList = "card-content";
        forecastHumid.textContent = "Humidity: " + weather.daily[i].humidity + " %";

        // append
        forecastIcon.appendChild(img);
        forecastCard.appendChild(forecastDate);
        forecastCard.appendChild(forecastIcon);
        forecastCard.appendChild(forecastTemp);
        forecastCard.appendChild(forecastWind);
        forecastCard.appendChild(forecastHumid);
        cardContainer.appendChild(forecastCard);
    }
}


// jquery function to interact with search history list items




userFormEl.addEventListener("submit", formSubmitHandler);
