const currentTemp = document.querySelector("#weather-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherHumidity = document.querySelector("#weather-humidity");
const weatherThreeDay = document.querySelector("#weather-three-day");
const weatherConditions = document.querySelector("#weather-conditions");

const url = `https://api.openweathermap.org/data/2.5/weather?q=carlsbad&units=imperial&appid=baab5d803c6942ee7863c1184d688d72`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(weatherdata) {
    currentTemp.innerHTML = `<strong>${weatherdata.main.temp.toFixed(0)}</strong>`;

    const iconsrc = `https://openweathermap.com/img/w/${weatherdata.weather[0].icon}.png`;
    const desc = weatherdata.weather[0].description;
    let descCaps = desc.charAt(0).toUpperCase() + desc.slice(1);
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", descCaps);
    weatherConditions.textContent = descCaps;
    weatherHumidity.innerHTML = `${weatherdata.main.humidity}%`;
}

const threeDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=carlsbad&units=imperial&appid=baab5d803c6942ee7863c1184d688d72`;
async function threeDayFetch() {
    try {
        const response = await fetch(threeDayUrl);
        if (response.ok) {
            const data = await response.json();
            threeDayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
threeDayFetch();

function threeDayResults(weatherdata) {
    const dayOne = weatherdata.list[0].dt_txt;
    const dayTwo = weatherdata.list[8].dt_txt;
    const dayThree = weatherdata.list[16].dt_txt;
    let dayOneArray = [];
    let dayTwoArray = [];
    let dayThreeArray = [];
    for (let i = 0; i < 8; i++) {
        dayOneArray.push((weatherdata.list[i].main.temp));
    }
    for (let j = 8; j < 16; j++) {
        dayTwoArray.push((weatherdata.list[j].main.temp));
    }
    for (let r = 16; r < 24; r++) {
        dayThreeArray.push((weatherdata.list[r].main.temp));
    }
    const dayOneMin = parseInt(Math.min(...dayOneArray));
    const dayOneMax = parseInt(Math.max(...dayOneArray));
    const dayTwoMin = parseInt(Math.min(...dayTwoArray));
    const dayTwoMax = parseInt(Math.max(...dayTwoArray));
    const dayThreeMin = parseInt(Math.min(...dayThreeArray));
    const dayThreeMax = parseInt(Math.max(...dayThreeArray));
    const convertedDayOne = new Date(dayOne).toLocaleDateString('en-us', {day: "numeric", month: "long"});
    const convertedDayTwo = new Date(dayTwo).toLocaleDateString('en-us', {day: "numeric", month: "long"});
    const convertedDayThree = new Date(dayThree).toLocaleDateString('en-us', {day: "numeric", month: "long"});
    threeDayInner(convertedDayOne, dayOneMin, dayOneMax);
    threeDayInner(convertedDayTwo, dayTwoMin, dayTwoMax);
    threeDayInner(convertedDayThree, dayThreeMin, dayThreeMax);
}
function threeDayInner(date, low, high) {
    weatherThreeDay.innerHTML += `<span class="three-day-wrapper">
    <span class="weather-date">${date}</span>
    <span>⬆️ High: ${high}</span>
    <span>⬇️ Low: ${low}</span>
    </span>`;
}