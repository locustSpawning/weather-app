console.log('🌙');

fetch(
    `https://api.weatherapi.com/v1/current.json?key=9728ba0a63ac4ca39e1154549230307&q=swedesboro`,
    { mode: 'cors' }
)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response.current.condition.text);
    })
    .then(function (response) {
        console.log(response.current.temp_c);
    })
    .then(function (response) {
        console.log(response.current.temp_f);
    })
    .then(function (response) {
        console.log(response);
    });
