function showNewNote() {
    document.getElementById("modal").style.display = 'block';
    document.getElementById("modal-fade").style.display = 'block';
}
function hideNewNote() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal-fade").style.display = "none";
}
function calendarDates(){
    content = "";
    y = 1;
    today = new Date();
    if (!document.getElementById("month").value ){
        totalDays = monthDays(today.getMonth(), today.getFullYear());
        firstDate = startDay(today.getMonth(), today.getFullYear());
        monthDescription = today.toLocaleString('default', { month: 'long' })
        yearDescription = today.getFullYear();

    } else {
        totalDays = monthDays(document.getElementById("month").value, document.getElementById("year").value);
        firstDate = startDay(document.getElementById("month").value, document.getElementById("year").value);
        date = new Date(document.getElementById("year").value, document.getElementById("month").value);
        monthDescription = date.toLocaleString('default', { month: 'long' })
        yearDescription = date.getFullYear();
    }
    y = firstDate.start;
    lastMonth = true;
    for (var i = 0; i< 5; i++){
        content += "<tr>";
        for (var x = 0; x < 7; x++){
            content += "<th>";
            content += "<div class='days'>"
            content +=      "<div class='date'>"+y+"</div>";
            // content +=      "<div class='note'>Aniversário Mariana</div>";
            content += "</div>";
            content += "</th>";
            if (y == firstDate.end && lastMonth){
                y = 1;
                lastMonth = false;
            } else {
                y ++;
            }            
            if (y == totalDays && !lastMonth){
                y = 1;
            }
        }
        content += "</tr>";
    }
    var calendar = document.getElementById("calendar-table");
    calendar.innerHTML = content;

    var calendarMonth = document.getElementById("month-description");
    calendarMonth.innerHTML = monthDescription+ "-"+yearDescription;
}

function monthDays(month, year) {
    var days = new Date(year,month,0);
    return days.getDate();
}
function startDay(month, year){
    lastMonth = month - 1;
    daysLastMonth = monthDays(lastMonth, year);
    weekDayMonth  = new Date(year, month, 1);
    firstWeekDay = daysLastMonth - weekDayMonth.getDay() + 1;

    let result = {start: firstWeekDay, end: daysLastMonth};
    return result;
}

function changeMonth(next){
    today = new Date();
    actualMonth = today.getMonth()+1;
    month = document.getElementById("month");
    year = document.getElementById("year");
    if (next){
        if (!month.value ){
            if (actualMonth != 12){
                month.value = actualMonth + 1;
                year.value = today.getFullYear();
            } else {
                month.value = 1;
                year.value = today.getFullYear() + 1;
            }
        } else {
            if (parseInt(month.value) != 12){
                month.value = parseInt(month.value) + 1;
            } else {
                month.value = 1;
                year.value = parseInt(year.value) + 1;
            }
        }
    } else {   
        if (!month.value ){
            if (actualMonth != 1){
                month.value = actualMonth - 1;
                year.value = today.getFullYear();
            } else {
                month.value = 1;
                year.value = today.getFullYear() - 1;
            }
        } else {
            if (parseInt(month.value) != 1){
                month.value = parseInt(month.value) - 1;
            } else {
                month.value = 12;
                year.value = parseInt(year.value) - 1;
            }
        }
    }
    calendarDates();
}
async function loadApi(){
    const res =  await fetch("http://localhost:3000/").then((data) => data.json())
    // res.agendas.map(({date, text}) => addEvent(date,text))
}
calendarDates()
loadApi()