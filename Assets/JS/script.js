$(document).ready(function ()
{
/* DOM elements */

//Search Elements
var searchBar = $("#search-bar");
var searchButton = $("#search-button");
var searchHistory = $("#search-history");

//Forecast Elements
var currentForecastCard = $("#current-forecast");
var futureForecastCardArray = $("#five-forecast-cards");

/* Variables */

const API_KEY = "110a9e99060f6e0d6ff7296656c3a744";//API key from Open Weather API.

var CurrentDate = luxon.DateTime.local();//Gets the current datetime from luxon.
var city = "Seattle";//The city to be looked up.

/* Main functions */

//Function that runs when the application is launched.
function initialize()
{
    getWeather();
    getFiveDay();
}

//Gets the current weather information for the given city, and then calls the populate function.
function getWeather()
{
    var requesturl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

    $.ajax({
        url: requesturl,
        method: "GET",
    }).then(function (response) {
        populateCurrentForecast(response);
    });
}

//Gets the five day forecast information for the given city, and then calls the populate function.
function getFiveDay()
{
    var requesturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;

    $.ajax({
        url: requesturl,
        method: "GET",
    }).then(function (response) {
        populateFiveDayForecast(response);
    });
}

/* Helper functions */

//Gets the UV index by the latitude and longitude. Gets called from the populate function because it can't take a city name so it uses the resulting lat and lon.
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
        if (uvnum <= 2)//Sets the proper color class according the the UX index safty.
            span.addClass("UVindex safe");
        else if (uvnum > 2 && uvnum < 8)
            span.addClass("UVindex warning");
        else
            span.addClass("UVindex danger");
    });
}

//Function to be called upon searching for a city. It takes the city and gets both the current and five day forecast information and renders it.
function renderInformation()
{
    city = searchBar.val().charAt(0).toUpperCase() + searchBar.val().substr(1).toLowerCase();
    searchBar.val("");
    getWeather();
    getFiveDay();
}

//Function to fill the current forecast card with data thats recieved.
function populateCurrentForecast(data)
{
    currentForecastCard.children(":nth-child(1)").children("span").text(`${city} (${CurrentDate.toLocaleString(CurrentDate.DATE_SHORT)})`);
    currentForecastCard.children(":nth-child(1)").children("img").attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    currentForecastCard.children(":nth-child(3)").children("span").text(data.main.temp);
    currentForecastCard.children(":nth-child(4)").children("span").text(data.main.humidity);
    currentForecastCard.children(":nth-child(5)").children("span").text(data.wind.speed);
    getUVIndex(data.coord.lat, data.coord.lon);
}

//Function to run a forloop on the future forecast array to set all five with data recieved.
function populateFiveDayForecast(data)
{
    var arrayofdays = [data.list[3], data.list[11], data.list[19], data.list[27], data.list[35]];
    for (var i = 1; i < arrayofdays.length + 1; i++)
    {
        futureForecastCardArray.children(`:nth-child(${i})`).children(".future-date").text(CurrentDate.plus({days: i}).toLocaleString(CurrentDate.DATE_SHORT));
        futureForecastCardArray.children(`:nth-child(${i})`).children("img").attr("src", `http://openweathermap.org/img/wn/${arrayofdays[i - 1].weather[0].icon}@2x.png`);
        futureForecastCardArray.children(`:nth-child(${i})`).children(".future-temp").children("span").text(arrayofdays[i - 1].main.temp);
        futureForecastCardArray.children(`:nth-child(${i})`).children(".future-humidity").children("span").text(arrayofdays[i - 1].main.humidity);
    }
}

/* Attaching listeners */

searchBar.keydown(function (event)//Little listener to search when hitting enter.
{
    if (event.keyCode === 13)//Keycode for enter.
        searchButton.click();
})
searchButton.on("click", renderInformation);//Renders information for the given city.

/* Initializing call */

initialize();

});