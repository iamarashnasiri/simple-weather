// get location API
const getLocation = async () => {
    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';
    const response = await fetch(url);
    const data = response.json();
    return data;
}
// get weather API
const getWeather = async (lat, lon) => {
    api = 'f0894defae7c5584798f8812232a40c2';
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

    const response = await fetch(url);
    const data = response.json();
    return data;
}
// icons choise function
function getIcon(weMain) {
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const DayOrNigh = getDayOrNight();
            icon = `${weMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}
// determine day or night
function getDayOrNight() {
    let DayOrNigh;
    var d = new Date();
    const hour = d.getHours();
    if (hour >= 6 && hour <= 19) {
        DayOrNigh = 'Day';
    } else {
        DayOrNigh = 'Night';
    }
    return DayOrNigh;
}
// determine month
const myTimeF = () => {
    let dt = new Date();
    const data = (("0" + (dt.getMonth() + 1)).slice(-2)) + "/" + (("0" + dt.getDate()).slice(-2)) + "/" + (dt.getFullYear());
    return data;
}
const monthIf = (mdate) => {
    let data;
    switch (mdate) {
        case 1:
            data = "Jan";
            break;
        case 2:
            data = "Feb";
            break;
        case 3:
            data = "Mar";
            break;
        case 4:
            data = "Apr";
            break;
        case 5:
            data = "May";
            break;
        case 6:
            data = "Jun";
            break;
        case 7:
            data = "Jul";
            break;
        case 8:
            data = "Aug";
            break;
        case 9:
            data = "Sep";
            break;
        case 10:
            data = "Oct";
            break;
        case 11:
            data = "Nov";
            break;
        case 12:
            data = "Dec";
            break;
    }
    return data;
}
// tiem function
const myCustomDate = () => {
    let d = new Date();
    const data = d.getDate() + ", " + monthIf((d.getMonth() + 1)) + ", " + d.getFullYear();
    return data;
}
myCustomDate()
// temperature Conversion
function getTemp(weTemp) {
    const k = weTemp;
    const f = (k - 273.15) * 9 / 5 + 32;
    const c = k - 273.15;
    return temp = { kel: Math.floor(k), far: Math.floor(f), can: Math.floor(c) };
}
// variations
const myTime = document.querySelector('#tdDate');
const myTimeZone = document.querySelector('#myLoc');
const icon = document.querySelector('.icon');
const tempArea = document.querySelector('.temperature');
const myTemp = document.querySelector('#number');
const myTempSym = document.getElementById('symbol');
const tempDes = document.querySelector('.temperature-description');
const myChange1 = document.querySelector('#K');
console.log(myChange1);
const myChange2 = document.querySelector('#F');
console.log(myChange2);
const myChange3 = document.querySelector('#C');
console.log(myChange3);
// load event
window.addEventListener('load', () =>
    getLocation()
        .then(getLocationData => {
            const currentCity = getLocationData.country + ", " + getLocationData.city;
            myTimeZone.innerHTML = currentCity.split('/');
            myTime.innerHTML = myCustomDate();
            getWeather(getLocationData.lat, getLocationData.lon)
                .then(getWeatherData => {
                    const weTemp = getWeatherData.main.temp;
                    const weStatus = getWeatherData.weather[0].main;
                    const weDes = getWeatherData.weather[0].description;
                    const myIcon = getIcon(weStatus);
                    icon.innerHTML = `<img src='./icons/${myIcon}'></img>`;
                    myTemp.textContent = Math.floor(weTemp)
                    tempDes.textContent = weDes;
                    myChange1.style.background = '#F5F6F8';

                    myChange1.addEventListener('click', (e) => {
                        myTemp.textContent = getTemp(weTemp).kel;
                        myTempSym.textContent = '° K';
                        myChange1.style.background = '#F5F6F8';
                        myChange2.style.background = '#fff';
                        myChange3.style.background = '#fff';
                    })

                    myChange2.addEventListener('click', (e) => {
                        myTemp.textContent = getTemp(weTemp).far;
                        myTempSym.textContent = '° F';
                        myChange2.style.background = '#F5F6F8';
                        myChange1.style.background = '#fff';
                        myChange3.style.background = '#fff';

                    })
                    myChange3.addEventListener('click', (e) => {
                        myTemp.textContent = getTemp(weTemp).can;
                        myTempSym.textContent = '° C';
                        myChange1.style.background = '#fff';
                        myChange2.style.background = '#fff';
                        myChange3.style.background = '#F5F6F8';
                    })

                    tempArea.addEventListener('click', function (e) {
                        if (myTempSym.textContent == '° K') {
                            myTemp.textContent = getTemp(weTemp).far;
                            myTempSym.textContent = '° F';
                        }
                        else if (myTempSym.textContent == '° F') {
                            myTemp.textContent = getTemp(weTemp).can;
                            myTempSym.textContent = '° C';
                        }
                        else {
                            myTemp.textContent = getTemp(weTemp).kel;
                            myTempSym.textContent = '° K';
                        }
                    })
                })
        })
)
