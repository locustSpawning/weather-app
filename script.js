var printDate;
var date;
var day;
var month;
var year;

let locationSearch = document.getElementById('city-search').value;

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

console.log('🌙');

fetch(
    `https://api.weatherapi.com/v1/current.json?key=9728ba0a63ac4ca39e1154549230307&q=swedesboro`,
    { mode: 'cors' }
)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
    });
