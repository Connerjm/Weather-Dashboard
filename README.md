# Weather-Dashboard

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Launch](#launch)
- [Images](#images)
- [Todos](#todos)
- [Issues](#issues)

## Introduction

This application is a browser based weather dashboard. Utilizing the OpenWeather API, the user will be able to search for a city and recieve the basic weather information and present it in the dynamic UI.

The acceptance criteria is as follows:

- [x] Upon searching for a city, the user is presented with current and future weather conditions for that city.
- [x] Searched cities are added to the search history.
- [x] When viewing current weather for a given city, the city name, date, icon, temperature, humidity, wind speed and UV index are presented.
- [x] Upon viewing the UV index, a color that indicates conditions is shown.
- [x] When looking at future weather conditions for a given city, the user is presented with a five day forcast displaying date, icon, temperature and humidity.
- [x] When clicking a city in the search history, the info for that city is presented again.

## Technologies

- HTML
- CSS
  - Bootstrap 4.6.0
  - Font Awesome 4.7.0
- JavaScript
  - jQuery 3.5.1
  - Luxon js
- Open Weather API

## Launch

[GitHub Repository](https://github.com/Connerjm/Weather-Dashboard)
[Deployment](https://connerjm.github.io/Weather-Dashboard/)

## Images

Deployment of the Application
![Deployment of the Application](#)

## Todos

- [x] Impliment the search history, saving locally.
- [x] Validate User input/Handle error codes from API calls.
- [x] Repopulate the weather cards when clicking a history entry.
- [x] Refactor functions to remove redundent code. (renderinformation())
- [ ] Limit history entries.
- [ ] Don't add duplicate entries in the history, just move it to the top.
- [ ] Put the error alert in a modal?
- [x] Get the users current city and initialize to that location?
- [ ] Put State abriviations after city names in the history and current forecast card?

## Issues

None at present
