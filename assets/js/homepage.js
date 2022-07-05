var userFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search");
var dateHeader = document.querySelector("#date");
var tempCurrent = document.querySelector("#temp");
var windCurrent = document.querySelector("#wind");
var humidCurrent = document.querySelector("#humidity");
var uvCurrent = document.querySelector("#uv");

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
        });
    });
};

var displayWeather = function(weather) {

    console.log(weather);
    tempCurrent.textContent = weather.current.temp;
    console.log(weather.current.temp);
    console.log(weather.current.wind_speed);
    console.log(weather.current.humidity);
    console.log(weather.current.uvi);
}




// 


userFormEl.addEventListener("submit", formSubmitHandler);
// getLocationData();
