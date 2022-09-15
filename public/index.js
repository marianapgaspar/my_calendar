function showNewNote() {
    document.getElementById("modal").style.display = 'block';
    document.getElementById("modal-fade").style.display = 'block';
}
function hideNewNote() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal-fade").style.display = "none";
}
function getDate(element, compare) {
    if (compare == element.date){
        return element.text
    } else {
        return ""
    }
}
function calendarDates(res){
    content = "";
    y = 1;
    today = new Date();
    
    if (!document.getElementById("month").value ){
        totalDays = monthDays(today.getMonth(), today.getFullYear());
        firstDate = startDay(today.getMonth(), today.getFullYear());
        monthDescription = today.toLocaleString('default', { month: 'long' })
        yearDescription = today.getFullYear();
        month = today.getMonth()+1;
        if (month < 10){
            month = "0"+month;
        }
        fullDate = today.getFullYear()+"-"+month;

    } else {
        totalDays = monthDays(document.getElementById("month").value, document.getElementById("year").value);
        firstDate = startDay(document.getElementById("month").value, document.getElementById("year").value);
        day = new Date(document.getElementById("year").value, document.getElementById("month").value);
        monthDescription = day.toLocaleString('default', { month: 'long' })
        yearDescription = day.getFullYear();
        month = day.getMonth()+1;
        if (month < 10){
            month = "0"+month;
        }
        fullDate = day.getFullYear()+"-"+(month);
    }
    y = firstDate.start;
    lastMonth = true;
    nextMonth = false;
    isToday = true;
    if (today.toLocaleString('default', { month: 'long' }) != monthDescription || today.getFullYear() != yearDescription){
        isToday = false;
    }
    
    for (var i = 0; i< 5; i++){
        content += "<tr>";
        for (var x = 0; x < 7; x++){
            fullDay = fullDate+"-"+y;
            text = "";
            classDay = "next-days";
            if (y <= firstDate.end && lastMonth){
                classDay = "days";
            } else if(!nextMonth){
                classDay = "actual-days";
            } 
            if (isToday && today.getDate() == y){
                classDay = "today"
            }

            res.agendas.map(function(element){
                if (fullDay == element.date){
                    del = "?text="+element.text.replace(" ", "%20")+"&date="+element.date+"&del=1"
                    text += "<div class='note'>"+element.text+"<a class='close' onclick='deleteText(\""+del+"\")'>x</a></div>"
                }
            })
            content += "<th>";
            content += "<div class='"+classDay+"'>"
            content +=      "<div class='date'>"+y+"</div>";
            content +=      text;
            content += "</div>";
            content += "</th>";
            if (y >= firstDate.end && lastMonth){
                y = 1;
                lastMonth = false;
            } else {
                y ++;                
            }   
            if (y >= totalDays && !lastMonth){
                y = 1;
                nextMonth = true;
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
    loadApi();
}
function addAgenda(){
    const text = document.getElementById("text").value;
    const date = document.getElementById("date").value;
    fetch("http://localhost:3000/?text="+text+"&date="+date).then((data) => data.json())
    hideNewNote();
    loadApi();
}
function deleteText(text){
    fetch("http://localhost:3000/"+text).then((data) => data.json())
    loadApi();
}
async function loadApi(){
    const res =  await fetch("http://localhost:3000/").then((data) => data.json())
    calendarDates(res)
}
loadApi()