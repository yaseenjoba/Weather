//an obj with all weather data that will be used through the website
let weatherData = {};
//this parameter value is from the 2ed api
let country;
/**
 * get all needed data using one call and current weather apis
 * @param  {String} cityName city Name 
 */
function weatherByCityName(cityName) {
    var key = 'cad86314552b94deb5b82fa8e5e1e33e';
    //this api is used to get the country name + lat + lon
    let apiCountry = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key;
    let cityLat, cityLon;
    fetch(apiCountry)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            getCountryName(data);
            cityLon = data.coord.lon;
            cityLat = data.coord.lat;
            apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon +
                '&units=metric' + '&exclude=minutely&appid=' + key;
            //weather data
            fetch(apiUrl)
                .then(function(resp) { return resp.json() })
                .then(function(countryApidata) {
                    drawWeather(countryApidata);
                })
                .catch(function() {
                    // catch any errors
                    alert("Please try to write a single word of the city name you are searching for!")
                });
        })
        .catch(function() {
            // catch any errors
            alert("Please try to write a single word of the city name you are searching for!")
        });
}
/**
 * get all needed data using one call and current weather apis
 * @param  {Number} cityLat The Latitude 
 * @param  {Number} cityLon The Longitude
 */
function weatherByLatLon(cityLat, cityLon) {
    var key = 'cad86314552b94deb5b82fa8e5e1e33e';
    let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon +
        '&units=metric' + '&exclude=minutely&appid=' + key;
    let apiCountry = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + key
    fetch(apiCountry)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            getCountryName(data);
            fetch(apiUrl)
                .then(function(resp) { return resp.json() })
                .then(function(data) {
                    drawWeather(data);
                })
                .catch(function() {
                    // catch any errors
                    alert(console.error())
                });
        })
        .catch(function() {
            // catch any errors
            alert(console.error())
        });
}
/*
 get data for weather using the current location of the device
 */
function getInitialData() {
    weatherByCityName('moscow')
    isAgree = false
    let lat;
    let lon;
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        var key = 'cad86314552b94deb5b82fa8e5e1e33e';
        let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +
            '&units=metric' + '&exclude=minutely&appid=' + key;
        let apiCountry = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key

        fetch(apiCountry)
            .then(function(resp) { return resp.json() })
            .then(function(data) {
                getCountryName(data);
                fetch(apiUrl)
                    .then(function(resp) { return resp.json() })
                    .then(function(data) {
                        drawWeather(data);
                    })
                    .catch(function() {
                        // catch any errors
                        alert(console.error())
                    });
            })
            .catch(function() {
                // catch any errors
                alert(console.error())
            });
    })

}

/**
 * creat a new obj that includes the data that will be used in the website 
 * @param  {Object} data data for a specific city
 */

//icons : to replace the icons from open weather api to our icons in assets/images
icons = [{
        weatherIcon: {
            value1: '01d',
            value2: 'assets/images/weather_icons/day.svg'
        }
    }, {
        weatherIcon: {
            value1: '02d',
            value2: 'assets/images/weather_icons/cloudy-day-3.svg'
        }
    }, {
        weatherIcon: {
            value1: '03d',
            value2: 'assets/images/weather_icons/cloudy.svg'
        }
    }, {
        weatherIcon: {
            value1: '04d',
            value2: 'assets/images/weather_icons/cloudy.svg'
        }
    }, {
        weatherIcon: {
            value1: '09d',
            value2: 'assets/imagesvg/weather_icons/rainy-6.s'
        }
    }, {
        weatherIcon: {
            value1: '09n',
            value2: 'assets/images/weather_icons/rainy-6.svg'
        }
    }, {
        weatherIcon: {
            value1: '10d',
            value2: 'assets/images/weather_icons/rainy-3.svg'
        }
    }, {
        weatherIcon: {
            value1: '11d',
            value2: 'assets/images/weather_icons/thunder.svg'
        }
    }, {
        weatherIcon: {
            value1: '11n',
            value2: 'assets/images/weather_icons/thunder.svg'
        }
    }, {
        weatherIcon: {
            value1: '13d',
            value2: 'assets/images/weather_icons/snowy-5.svg'
        }
    }, {
        weatherIcon: {
            value1: '13n',
            value2: 'assets/images/weather_icons/snowy-5.svgsnowy-5.svg'
        }
    }, {
        weatherIcon: {
            value1: '01n',
            value2: 'assets/images/weather_icons/night.svg'
        }
    }, {
        weatherIcon: {
            value1: '02n',
            value2: 'assets/images/weather_icons/cloudy-night-3.svg'
        }
    }, {
        weatherIcon: {
            value1: '03n',
            value2: 'assets/images/weather_icons/cloudy.svg'
        }
    }, {
        weatherIcon: {
            value1: '04n',
            value2: 'assets/images/weather_icons/cloudy.svg'
        }
    }, {
        weatherIcon: {
            value1: '10n',
            value2: 'assets/images/weather_icons/rainy-6.svg'
        }
    },

]

function drawWeather(data) {
    let currentDate = new Date(data.current.dt * 1000 + data.timezone_offset);
    let sunsetDate = new Date(data.current.sunset * 1000 + data.timezone_offset);
    //This object include all data that will be used in the website 
    //All data are in the correct units and temp is in celsius 
    weatherData = {
        'currentDate': currentDate,
        //DailySide: summary componant
        'currentWeatherIcon': `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`,
        'currentWeekDay': getDayName(currentDate.getDay()), //sat ,sun...
        'currentDay': currentDate.getDate(),
        'currenWeek': getTheWeekFromCurrentDay(),
        'curruntMonthName': getMonthName(currentDate.getMonth()),
        'cityName': data.timezone.substring(data.timezone.indexOf("/") + 1),
        'countryName': country,
        'currentTemp': data.current.temp,
        'feelsLike': data.current.feels_like,
        'sunsetTime': sunsetDate.getHours() + ':' + sunsetDate.getMinutes(),
        'windSpeed': data.daily[0].wind_speed * 3600,
        'humidity': data.daily[0].humidity,
        'pressure': data.daily[0].pressure * 100,
        //DailySide:Chance of Rain componant
        //Array of object for time and raining for the next 24H
        'hourlyChanceOfRain': getChance(data.hourly, data.timezone_offset),
        //ForcasteSide:
        'dailyHumidity': [],
        'dailyIcon': [],
        'dailyDayTemp': [],
        'dailyNightTemp': [],
        'dailyChanceOfPop': [],
        //Bottom sec in forcast side
        //The Api provide hourly data for 48H only
        //hourlyTemp is array of objs that provide the time and temp at that hour
        'hourlyTemp': getHourlyTemp(data.hourly, data.timezone_offset),
        //there is lowest&highest temp for the next 7 days but u only need the next 3 days
        'lowestTemp': [data.daily[0].temp.min, data.daily[1].temp.min, data.daily[2].temp.min],
        'highestTemp': [data.daily[0].temp.max, data.daily[1].temp.max, data.daily[2].temp.max],
    };
    //Change the daily data in the weatherData obj-the currant day is not counted
    for (var i = 1; i < 8; i++) {
        weatherData['dailyHumidity'].push(data.daily[i].humidity);
        weatherData['dailyDayTemp'].push(data.daily[i].temp.day);
        weatherData['dailyNightTemp'].push(data.daily[i].temp.night);
        weatherData['dailyChanceOfPop'].push(data.daily[i].pop);
    }
    //mapping the icons
    for (var x = 0; x < 8; x++) {
        for (let j = 0; j < icons.length; j++) {
            if (data.daily[x].weather[0].icon == icons[j].weatherIcon.value1) {
                weatherData['dailyIcon'].push(icons[j].weatherIcon.value2);
            }
        }
    }
    //calling functions for each section 

    //1- for chart
    dataForChart(weatherData);
    //2- for the forcast table
    showData(weatherData);
    //3- for the first section in the summary column
    getDataForSummaryColumn(weatherData);
    //4- for the chance section in summary column
    chanceDate(weatherData)
}

/**
 * give country var a value based on the lat&lon
 * @param  {Object} data data from the 2ed api
 */
function getCountryName(data) {
    country = data.sys.country;
}
/**
 * return day as a string
 * @param  {Number} day day number 0-6
 * @return {string} the weekday that the param represnts
 */
let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDayName(day) {
    return weekday[day];
}

function getTheWeekFromCurrentDay() {
    let curr = new Date; // get current date
    let first = curr.getDate(); // First day is the day of the month - the day of the week
    // last day is the first day + 6
    let firstday = new Date(curr.setDate(first)).toUTCString();
    let ourWeek = []
    for (let i = 0; i < 7; i++) {
        if (weekday[i].includes(firstday.substr(0, firstday.indexOf(',')))) {
            x = i; //x=6, x=7
            for (let j = 0; j < 7; j++) {
                if (x != 7) //x=6, x=7
                    ourWeek[j] = weekday[x];
                else {
                    x = 0;
                    ourWeek[j] = weekday[x];
                }
                x++;
            }
            return ourWeek;
        }
    }
}
/**
 * return day as a string
 * @param  {Number} day month number 0-11
 * @return {String} month name that the param represents
 */
function getMonthName(month) {
    let monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthsName[month];
}
/**
 * the time and chance of rain for it for the next 24H
 * @param  {Object} hourlyForcast the forcast in hours in the next 48H
 * @param  {Number} timezoneOffset timezone offset at unix unit
 * @return {Array} time and chance of rain for the next 24 hours
 */
function getChance(hourlyForcast, timezoneOffset) {
    let chanceArray = [];
    for (var i = 0; i < 24; i++) {
        let chanceObj = {
            'time': (new Date(hourlyForcast[i].dt * 1000 + timezoneOffset).getHours()),
            'chanceOfRain': hourlyForcast[i].pop
        }
        chanceArray.push(chanceObj);
    }
    return chanceArray;
}
/**
 * the temp for the next 48H
 * @param  {Object} hourlyForcast the forcast in hours in the next 48H
 * @param  {Number} timezoneOffset timezone offset at unix unit
 * @return {Array} objs of time and temp and every hour for the next 48H
 */
function getHourlyTemp(hourlyForcast, timezoneOffset) {
    let temp = [];
    for (var i = 0; i < 48; i++) {
        let tempObj = {
            'time': (new Date(hourlyForcast[i].dt * 1000 + timezoneOffset).getHours()),
            'temp': hourlyForcast[i].temp
        }
        temp.push(tempObj);
    }
    return temp;
}