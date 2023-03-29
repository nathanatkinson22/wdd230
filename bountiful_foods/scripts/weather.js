const currentTemp = document.querySelector(".weather-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherConditions = document.querySelector(".weather-conditions");
const windSpeed = document.querySelector(".wind-speed");

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
    const speedData = weatherdata.wind.speed;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", descCaps);
    weatherConditions.textContent = descCaps;
    windSpeed.innerHTML = speedData;
}