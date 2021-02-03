function getDataForSummaryColumn(data) {
    // for the first section
    document.getElementById('weekday').innerHTML = data.currentWeekDay;
    document.getElementById('day-number').innerHTML = data.currentDay;
    document.getElementById('month-name').innerHTML = data.curruntMonthName;
    document.getElementById('temp').innerHTML = data.currentTemp + `<sup id="temp-degree">&#8451;</sup>`;
    document.getElementById('city-name').innerHTML = data.cityName;
    document.getElementById('country-name').innerHTML = data.countryName;
    document.getElementById('feels-like').innerHTML = data.feelsLike;
    document.getElementById('sunset-time').innerHTML = data.sunsetTime;
    document.getElementById('wind-speed').innerHTML = Math.trunc(data.windSpeed);
    document.getElementById('humidity').innerHTML = data.humidity;
    document.getElementById('pressure').innerHTML = Math.trunc(data.pressure) + " pa";
}