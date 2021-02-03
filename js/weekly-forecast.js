/*
    changePrecipitationBar(value: any, num: any): void, this function is responsible for
    adujusting the bar length in each data row, based on actual precipitation value
*/
const changePrecipitationBar = (value, num) => {
    let i = 0;
    let barElem = document.getElementById(`bar-${num}`);

    barElem.style.width = value + '%';
}

/*
    showData(): void, this function is responsible for showing the weather forecast
    for the upcoming 5 or 7 days. It shows a set of columns, each column consists of:
        1. day
        2. humidity percentage
        3. icon for showcasing weather status
        4. at-night degree (in celsius)
        5. the chance of precipitation (as the red bar)
        6. at-morning degree (in celsius)
    Then this function also calls the changePrecipitationBar() function, which adujust
    the bar length based on actual precipitation value
    This function is called at load start at the body tag in HTML page
*/
const showData = (data) => {
    document.getElementById("data-container").innerHTML =
        `
    <div class="categories">
        Week
    </div>
    `
    staticData = [
        { day: data.currenWeek[0], humidity: data.dailyHumidity[0], icon: data.dailyIcon[0], nightDegree: data.dailyNightTemp[0], precipitation: data.dailyChanceOfPop[0], mornDegree: data.dailyDayTemp[0] },
        { day: data.currenWeek[1], humidity: data.dailyHumidity[1], icon: data.dailyIcon[1], nightDegree: data.dailyNightTemp[1], precipitation: data.dailyChanceOfPop[1], mornDegree: data.dailyDayTemp[1] },
        { day: data.currenWeek[2], humidity: data.dailyHumidity[2], icon: data.dailyIcon[2], nightDegree: data.dailyNightTemp[2], precipitation: data.dailyChanceOfPop[2], mornDegree: data.dailyDayTemp[2] },
        { day: data.currenWeek[3], humidity: data.dailyHumidity[3], icon: data.dailyIcon[3], nightDegree: data.dailyNightTemp[3], precipitation: data.dailyChanceOfPop[3], mornDegree: data.dailyDayTemp[3] },
        { day: data.currenWeek[4], humidity: data.dailyHumidity[4], icon: data.dailyIcon[4], nightDegree: data.dailyNightTemp[4], precipitation: data.dailyChanceOfPop[4], mornDegree: data.dailyDayTemp[4] }
    ];
    let i = 0;
    let dataContainer = document.getElementById("data-container");
    staticData.forEach(element => {
        dataContainer.innerHTML +=
            `
                <div class="flex-data-row">
                    <div class="data-row">
                        <div class="day-element">
                            <h4>${element['day']}</h4>
                        </div>
                        <div class="humidity-element">
                            <img class="humidity-icon" src="assets/images/humidity-icon.png">
                            <h4 class="humidity-value">${element['humidity']}%</h4>
                        </div>
                        <div class="forecast-element">
                            <img class="forecast-icon" src="${element['icon']}">
                        </div>    
                        <div class="night-degree-element">
                            <h4 class="night-degree">${element['nightDegree']}</h4>
                            <sup class="night-c">&deg;C</sup>
                        </div>
                        <div class="precipitation">
                            <p class="dash-before"> &mdash;</p>
                            <div id="progress">
                                <div class="bar" id="bar-${i}"></div>
                            </div>
                            <p class="dash-after"> &mdash;</p>
                        </div>
                        <div class="morning-degree-element">
                            <h4 class="morning-degree">${element['mornDegree']}</h4>
                            <sup class="morning-c">&deg;C</sup>
                        </div>
                    </div>
                </div>  
                `;

        changePrecipitationBar(element['precipitation'] * 100, i);
        i++;
    });

}