//const APIURL = 'http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json';
//const apiUrl = (longitude, latitude) => `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civil&output=json`;

const UsApiUrl = (gridId, gridX, gridY) => `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`;
const gridURL = (latitude, longitude) => `https://api.weather.gov/points/${latitude},${longitude}`;
const main = document.getElementById('main');
const form = document.getElementById('form');
//const searchLon = document.getElementById('searchPos');


// async function getWeatherByLocation() {
//     const resp = await fetch(APIURL);
//     const respData = await resp.json();
//     const weather = respData;

//     console.log("-- " + weather.dataseries[0].weather);
//     console.log("-- " + weather.dataseries[0].wind10m.direction);
// }


// async function getWeatherByLonLat(longitude, latitude) {
//     const resp = await fetch(apiUrl(longitude, latitude));

//     const respData = await resp.json();
//     const weather = respData;

//     addWeatherTopage(respData)
// }

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchVal = e.target.latlon.value;
    const latlon = searchVal.split(",");

    //console.log(latlon[0] + '---' + latlon[1]);
    if (searchVal) {
        getGridByLatLon(latlon[0], latlon[1]);
    }
});

async function getGridByLatLon(latitude, longitude) {
    const resp = await fetch(gridURL(latitude, longitude));

    const respData = await resp.json();

    //console.log("... " + respData.properties.gridId);
    //console.log(respData.properties.gridX + "... " + respData.properties.gridY);

    getWeatherInfoForGrid(respData.properties.gridId, respData.properties.gridX, respData.properties.gridY);
}

async function getWeatherInfoForGrid(gridId, gridX, gridY) {
    const resp = await fetch(UsApiUrl(gridId, gridX, gridY));
    const respData = await resp.json();

    addWeatherTopage(respData);
}

function addWeatherTopage(data) {
    const temp = FtoC(data.properties.periods[0].temperature);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
    <h2><img src="${data.properties.periods[0].icon}" /> ${data.properties.periods[0].name} ${temp}°C <img src="${data.properties.periods[0].icon}" /></h2>
    <small>${data.properties.periods[0].shortForecast}</small>
    
    <h2><img src="${data.properties.periods[2].icon}" /> ${data.properties.periods[2].name} ${temp}°C <img src="${data.properties.periods[2].icon}" /></h2>
    <small>${data.properties.periods[2].shortForecast}</small>

    <h2><img src="${data.properties.periods[4].icon}" /> ${data.properties.periods[4].name} ${temp}°C <img src="${data.properties.periods[4].icon}" /></h2>
    <small>${data.properties.periods[4].shortForecast}</small>
    `;
    //clear main before appending new child
    main.innerHTML = '';
    main.appendChild(weather);
}

//farenheit to celcius converter
function FtoC(F) {
    return Math.floor((5 * F - 160) / 9);
}


