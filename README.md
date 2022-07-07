## TODO

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Method

Using 2 different APIS, one to optain geolocation data, and another to display weather stats given the latitude + longitude from the geolocation data.

These functions populate two different divs with content, one for current weather and another for a 5 day forecast. 

## Github Repo url

https://github.com/Crackerbox123/weather


## Deployed Screenshot + URL


<img width="952" alt="105bf9d1309b89fe18ea0f939b6059f1" src="https://user-images.githubusercontent.com/61638208/177835696-a17b6edb-f92d-49a2-8e72-25f32eb7ea48.png">

