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

function getUVIndex()//TODO finish this bad boy.
{
    currentForecastCard.children(":nth-child(6)").children("i").text();
    currentForecastCard.children(":nth-child(6)").children("i").removeClass();
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
    
}

//Function to run a forloop on the future forecast array to set all five with data recieved.

//Testing

getWeather();

});