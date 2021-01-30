// DOM elements

//Variables

const API_KEY = "110a9e99060f6e0d6ff7296656c3a744";

var tempcity = "Spanaway";

//Main functions

function getWeather()
{
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${tempcity}&appid=${API_KEY}&units=imperial`;
    fetch(url)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            console.log(data);
        });
}

function getFiveDay()
{
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${tempcity}&appid=${API_KEY}&units=imperial`;
    fetch(url)
        .then(function (response)
        {
            if(response.status !== 200)
                alert(`Error ${response.status}`);
            return response.json();
        })
        .then(function (data)
        {
            console.log(data);
        });
}

//Helper functions

//Testing

getWeather();

getFiveDay();

/**
 * What we need from the initial api call
 * main>temp
 * main>humidity
 * wind>speed
 * UV index???
 * 
 * What we need from the 5day forecast call
 * dt_txt
 * main>temp
 * main>humidity
 */