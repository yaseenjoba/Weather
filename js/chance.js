    /*array  for the data*/


    const chanceDate = (data) => {
        let daily = [];
        let hour = []
            /*This function to set the hight and the color of the bars depand on the percantege*/

        let firstRow = document.getElementById('first-row-in-chance');
        firstRow.innerHTML =

            `
            <td></td>
            `;
        let secondRow = document.getElementById('second-row-in-chance');
        secondRow.innerHTML =
            `
        <td>
            <table class="child-table">
                <tr>
                    <td style="position: absolute;top: 0;">
                        <span>Heavy Rainy</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Rainy</span>
                    </td>
                </tr>
                <tr>
                    <td style="position: absolute;bottom: 0;">
                        <span>Sunny</span>
                    </td>
                </tr>
            </table>
        </td>
        `;
        let thirdRow = document.getElementById('third-row-in-chance');
        thirdRow.innerHTML =
            `
        <td></td>
        `;

        let j;
        for (j = 0; j < data.hourlyChanceOfRain.length; j++) {
            daily[j] = data.hourlyChanceOfRain[j].chanceOfRain * 100;
            hour[j] = data.hourlyChanceOfRain[j].time;
        }


        /* for loop which loops on the bars and give them the hight and the colo */
        let i;
        for (i = 0; i < daily.length; i++) {
            let y = "bar" + (i + 1);
            let d = "vd" + (i + 1);
            let times = "time" + (i + 1);
            let perc = "perc" + (i + 1);
            /*when you change the hight in the css change (200) here to the same hight*/
            let h = (daily[i] * 200) / 100;
            let b = h + daily[i];
            firstRow.innerHTML +=
                `
            <td>
                <span class="percenteg" id="${perc}">${Math.trunc( daily[i])}%</span>
            </td>
            `;
            if (hour[i] >= 12) {
                thirdRow.innerHTML +=
                    `
                    <td>
                        <span id="${times}">${hour[i]}PM</span>
                    </td>
                    `;
            } else {
                thirdRow.innerHTML +=
                    `
                    <td>
                        <span id="${times}">${hour[i]}AM</span>
                    </td>
                    `;
            };
            if (daily[i] == 0) {
                // document.getElementById(perc).innerHTML = daily[i] + "%";
                secondRow.innerHTML +=
                    `
                <td>
                    <div class="container">
                       <div class="all-prog" id="${y}">
                            <div class="vertical_dotted_line" id="${d}"></div>
                        </div>
                    </div>
                </td>
                `;
                // /*  set the color (percantege is high)  */
                document.getElementById(y).style.background = "#cf3504";
                // /* set the color (percantege is high) */
                document.getElementById(y).style.height = 10 + "px";
                // /* set the color (percantege is high) */
                document.getElementById(d).style.bottom = 10 + "px";
            }
            if (daily[i] > 0 && daily[i] <= 5) {
                // document.getElementById(perc).innerHTML = daily[i] + "%";
                secondRow.innerHTML +=
                    `
                <td>
                    <div class="container">
                       <div class="all-prog" id="${y}">
                            <div class="vertical_dotted_line" id="${d}"></div>
                        </div>
                    </div>
                </td>
                `;
                // /*  set the color (percantege is high)  */
                document.getElementById(y).style.background = "#EABA0D";
                // /* set the color (percantege is high) */
                document.getElementById(y).style.height = 12 + "px";
                // /* set the color (percantege is high) */
                document.getElementById(d).style.bottom = 12 + "px";
            }
            if (daily[i] < 50 && daily[i] > 5) {
                secondRow.innerHTML +=
                    `
                <td>
                    <div class="container">
                       <div  class="all-prog" id="${y}">
                            <div  class="vertical_dotted_line" id="${d}"></div>
                        </div>
                    </div>
                </td>
                `;
                /*set the color (percantege is low) */
                document.getElementById(y).style.background = "#EABA0D";
                // /* set the hight (percantege is low)  */
                document.getElementById(y).style.height = h + "px";
                // /*  set the the position(percantege is low)  */
                document.getElementById(d).style.bottom = h + "px";

            }
            if (daily[i] >= 50) {
                // document.getElementById(perc).innerHTML = daily[i] + "%";
                secondRow.innerHTML +=
                    `
                <td>
                    <div class="container">
                       <div class="all-prog" id="${y}">
                            <div class="vertical_dotted_line" id="${d}"></div>
                        </div>
                    </div>
                </td>
                `;
                // /*  set the color (percantege is high)  */
                document.getElementById(y).style.background = "#2E2E64";
                // /* set the color (percantege is high) */
                document.getElementById(y).style.height = h + "px";
                // /* set the color (percantege is high) */
                document.getElementById(d).style.bottom = h + "px";
            }

        }
    }