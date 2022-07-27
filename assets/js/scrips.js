/* to make an API call to OpenWeatherMap API, 

https://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}

https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}

*/

const apiKey = "ca8678f9340a3ab9557efbfb549fa3c9";
const searchForm = document.getElementById("search-form")


var buttonSearch = document.getElementById("button-search");
var cityInput = document.getElementById("search-city");

let currentWeatherContainer = document.getElementById("current-weather");
// Forecast containers to be generated from within the JavaScript file.


// triggerfunction for one-day forecast

let formHandler = function(event) {
    event.preventDefault();

    let cityName = cityInput.value.trim;

    if (cityName) {
        getCurrentWeather(cityName);
    } else {
        alert ("You cannot search nowhere: please enter a city.")
    }
}

let getCurrentWeather = function(city) {
    let citySearchURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    let coordinates;
    let coordData;
// I would like to ascend this to be formatted with async and await, but want to complete the basic requirements before messing around and breaking things.
    fetch (citySearchURL)
        .then (function (response) {
            if(response.ok)
// IF response passes, do the following.
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                coordData = data;
                console.log(coordData)
// Latitude and Longitude variables for immidiately next fetch.
                let latitude = data[0].lat;
                let longitude = data[0].lon;
                console.log(latitude);
                console.log(longitude);
// Fetching weather information.
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${apiKey}`)
                    .then(function (response) {
                        if(response.ok) {
                        console.log(response);
                        response.json().then(function (data) {
                            console.log(data);
                            displayCurrentWeather(data, city)
                        })
                        } else {
                            alert('ERROR: ' + response.status.Text + ".");
                        }
                    })
                    .catch(function (error) {
                        alert("ERROR: FAILED TO CONNECT TO OPENWEATHERMAPS.")
                    });
            })
        })
}

// getCurrentWeather("Sacramento");

let displayCurrentWeather = function(data, city) {
    if(data.length === 0) {
        alert("WEATHER DATA NOT FOUND");
        return;
    }
// Variables for filling out Current Weather Form:
    let currentCity = document.getElementById("current-city");
    let currentTemperature = document.getElementById("current-temperature");
    let currentWindSpeed = document.getElementById("current-wind-speed");
    let currentHumidity = document.getElementById("current-humidity");
    let currentUVIndex = document.getElementById("current-uv-index");
// Variables for weather emoji icon:
    let weatherIconCode = data.current.weather[0].icon;
    let weatherIconCodeUrl = `https://openweathermap.org/img/w/"${weatherIconCode}".png`;
    let iconEl = document.createElement("icon");
        iconEl.setAttribute('src', weatherIconCodeUrl);
    let weatherIcon = iconEl;
//
/* Unsure of why these didn't work. Had to get JQuery just to do this.
    currentCity.textContent += `${data.current.name}  ${weatherIcon}`
    currentTemperature.textContent += `${data.current.temp}°C`;
    currentWindSpeed.textContent += `${data.current.wind_speed} KPH`;
    currentHumidity.textContent += `${data.current.main.humidity}%`;
    currentUVIndex.textContent += `${data.current.uvi}`;
*/
    $("#current-city").text(data.current.name + weatherIcon);
    $("#current-temperature").text(data.current.temp + `°C`);
    $("#current-wind-speed").text(data.current.wind_speed + `KPH`);
    $("#current-humidity").text(data.current.main.humidity + `%`);
    $("#current-uv-index").text(data.current.uvi);
}




getCurrentWeather("Sacramento");

// card-header-title







/*
buttonSearch.addEventListener("click", clickSearch)
function clickSearch(event) {
    event.preventDefault();
    formHandler();
    console.log(cityName);
}
*/