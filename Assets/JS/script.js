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

var city = "Spanaway";//The city to be looked up.

//Main functions

function getWeather()//Gets the current forecast for a given city.
{
    var requesturl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

    $.ajax({
        url: requesturl,
        method: "GET",
    }).then(function (response) {
        console.log(response);//TODO Do something with the response.
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

//Function to get city from search bar and call the two apis and fill elements with response data.

//Function to fill the current forecast card with data thats recieved.

//Function to run a forloop on the future forecast array to set all five with data recieved.

//Testing
