const weatherTemp = document.querySelector('.weather-temp').innerText;
const windSpeed = document.querySelector('.wind-speed').innerText;
const windChillText = document.querySelector('.wind-chill');

function calcWindSpeed(temp, speed) {
    if (weatherTemp <= 50 && windSpeed > 3) {
        const windChill = 35.74 + (0.6215 * temp) - (35.75 * (speed**0.16)) + 0.4275 * temp * (speed**0.16)
        console.log(windChill);
        return windChill.toFixed(1);
    } else {
        return "N/A";
    }

}


const windChillNum = calcWindSpeed(weatherTemp, windSpeed);
windChillText.innerHTML = windChillNum;