$(document).ready(function ()
{
// DOM elements

//Search Elements
var searchBar = $("#search-bar");
var searchButton = $("#search-button");
var searchHistory = $("#search-history");

//Forecast Elements
var currentForecastCard = $("#current-forecast");
var futureForecastCardArray = $("#five-forecast-cards");

//Variables

const API_KEY = "110a9e99060f6e0d6ff7296656c3a744";//API key from Open Weather API.

var DateTime = luxon.DateTime;
var city = "Seattle";//The city to be looked up.

//Main functions

function getWeather()//Gets the current forecast for a given city.
{
    var requesturl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

    $.ajax({
        url: requesturl,
        method: "GET",
    }).then(function (response) {
        populateCurrentForecast(response);
    });
}

function getFiveDay()//Gets the five day forecast for the given city.
{
    var requesturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;

    $.ajax({
        url: requesturl,
        method: "GET",
    }).then(function (response) {
        console.log(response);//TODO Do something with the response.
    });
}

//Helper functions

function getUVIndex(lat, lon)
{
    var requesturl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`;

    $.ajax({
        url: requesturl,
        method: "GET",
    }).then(function (response) {
        var uvnum = response.current.uvi
        var span = currentForecastCard.children(":nth-child(6)").children("i");
        span.text(uvnum);
        span.removeClass();
        if (uvnum <= 2)
            span.addClass("UVindex safe");
        else if (uvnum > 2 && uvnum < 8)
            span.addClass("UVindex warning");
        else
            span.addClass("UVindex danger");
    });
}

//Function to get city from search bar and call the two apis and fill elements with response data.

//Function to fill the current forecast card with data thats recieved.
function populateCurrentForecast(data)
{
    currentForecastCard.children(":nth-child(1)").children("span").text(`${city} (${DateTime.local().toLocaleString(DateTime.DATE_SHORT)})`);
    currentForecastCard.children(":nth-child(1)").children("img").attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    currentForecastCard.children(":nth-child(3)").children("span").text(data.main.temp);
    currentForecastCard.children(":nth-child(4)").children("span").text(data.main.humidity);
    currentForecastCard.children(":nth-child(5)").children("span").text(data.wind.speed);
    getUVIndex(data.coord.lat, data.coord.lon);
}

//Function to run a forloop on the future forecast array to set all five with data recieved.

//Testing

getWeather();

});