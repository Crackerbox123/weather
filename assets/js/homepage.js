var userFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search");
var latitude = "";
var longitude = "";

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
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&appid=c7c0c5deb67324c42122e65149bc7cda";
    fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
        // latitude variable set
        console.log(data[0].lat);
        var latitude = data[0].lat;
        // long variable set
        console.log(data[0].lon);
        var longitude = data[0].lon;
        getWeather(latitude, longitude)
    });
});
};

var getWeather = function(latitude, longitude) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=c7c0c5deb67324c42122e65149bc7cda"
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            console.log(data)
        });
    });
};


// 


userFormEl.addEventListener("submit", formSubmitHandler);
// getLocationData();
