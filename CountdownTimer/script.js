const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

//const newYears = '1 Jan 2023';

function getDate() {
    const today = new Date();
    document.getElementById("selDate").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    const defaultDate = document.getElementById("selDate").value;
    console.log(defaultDate);
}


function countdown() {
    const newYearsDate = new Date(document.getElementById("selDate").value);
    //const newYearsDate = new Date(newYears);
    const currdate = new Date();

    const totalSeconds = (newYearsDate - currdate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60);

    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);


    // console.log(days, hours, minutes, seconds);
}


function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

//countdown();
setInterval(countdown, 1000);
