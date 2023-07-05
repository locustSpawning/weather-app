console.log('💧');

var printDate;
var date;
var day;
var month;
var year;

window.addEventListener('load', (event) => {
    //load date
    printDate = document.getElementById('date');
    date = new Date();
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();

    let currentDate = `${month}/${day}/${year}`;
    printDate.innerText = currentDate;
});

const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit-btn');
const error = document.querySelector('#error-msg');
form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    fetchWeather();
}

async function getWeatherData(location) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=9728ba0a63ac4ca39e1154549230307&q=${location}`,
        { mode: 'cors' }
    );
    if (response.status === 400) {
        throwErrorMsg();
    } else {
        error.computedStyleMap.display = 'none';
        const weatherData = await response.json();
        const newData = processData(weatherData);
        displayData(newData);
        reset();
    }
}

function throwErrorMsg() {
    error.computedStyleMap.display = 'block';
}

function processData(weatherData) {
    //grab all data to display on page
    const myData = {
        condition: weatherData.current.condition.text,
        feelsLike: {
            f: Math.round(weatherData.current.feelslike_f),
            c: Math.round(weatherData.current.feelslike_c),
        },
        currentTemp: {
            f: Math.round(weatherData.current.temp_f),
            c: Math.round(weatherData.current.temp_c),
        },
        wind: Math.round(weatherData.current.wind_mph),
        humidity: weatherData.current.humidity,
        location: weatherData.location.name.toUpperCase(),
    };

    //if in the US, add state
    //if not, add ccountry
    if (weatherData.location.country == 'USA United States of America') {
        myData['region'] = weatherData.location.region.toUpperCase();
    } else {
        myData['region'] = weatherData.location.country.toUpperCase();
    }

    return myData;
}

function displayData(newData) {
    const weatherInfo = document.getElementsByClassName('info');

    document.querySelector('#condition').textContent = `${newData.condition}`;
    document.querySelector(
        '#location'
    ).textContent = `${newData.location}, ${newData.region}`;
    document.querySelector('#degrees').textContent = `${newData.currentTemp.f}`;
    document.querySelector(
        '#feels-like'
    ).textContent = `Feels like ${newData.feelsLike.f}`;
    document.querySelector(
        '#wind-mph'
    ).textContent = `Wind: ${newData.wind}mph`;
    document.querySelector(
        '#humidity'
    ).textContent = `Humidity: ${newData.humidity}`;
}

function reset() {
    form.reset();
}

// get location from user
function fetchWeather() {
    const input = document.querySelector('input[type="text"]');
    const userLocation = input.value;
    getWeatherData(userLocation);
}
