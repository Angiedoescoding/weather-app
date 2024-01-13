// ==== TO SHOW THE CURRENT DATE ON THE MAIN PAGE ====

let currentDate = new Date();
let p = document.getElementById("date");
p.innerHTML = currentDate.toDateString();


// ==== TO SHOW THE CURRENT LOCATION SET (Seattle) ====


async function getWeather() {

let temperatureCurrentPlace = document.getElementById("temperature");
let conditionsCurrentPlace = document.getElementById("conditions");
let myCurrentPlaceLoc = document.getElementById("city");
let apiCurrentPlace = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "d913a45ab9b56e1fb916f85244168a2c";
let latitude = 47.620422;      // Specific data of Seattle
let longitude = -122.349358;   // Specific data of Seattle
let url = apiCurrentPlace +
    "?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=imperial";


await fetch(url)
    .then(response => response.json())
    .then(data => {
    let temp = data.main.temp;
    temp = (temp - 32) * 5 / 9;
    temp = temp.toFixed(1);
    temperatureCurrentPlace.innerHTML = temp;

    myCurrentPlaceLoc.innerHTML = data.name; //OUTPUT
    temperature.innerHTML = temp + "°C"; // OUTPUT
    location.innerHTML = data.name; // OUTPUT
    conditionsCurrentPlace.innerHTML = data.weather[0].main; //OUTPUT
    });
}

getWeather();



// ==== WORKING ON API LOCATION CALL AND RECEIVING A REQUESTED LOCATION DATA ====


const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",      
    key: "d913a45ab9b56e1fb916f85244168a2c"                    
}

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

function enter(e) {                        // (e) - event that we expect with our keybutton/keyboard
    if (e.keyCode === 13) {
        getInfo(input.value);              //  getInfo() >> a function name that is responsible to call a function when the Enter btn is pressed 
                                           // Enter pressed and then calling a function with what the user entered (input).value 
    }
}

async function getInfo(data) {            // data (use any word) - a set by us parameter to it and tie to what we need, otherwise w/o it nothing will be transferred and saved for future use
const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appid=${api.key}`);        // requesting an access to the API link of the object
const result = await res.json();                    // awaiting for a response to return to us
displayResult(result);              // now we need to display data that we got access to - creating a function and adding "result" to show that variable data specifically

function displayResult(result) {
let city = document.querySelector("#city");
city.textContent = `${result.name}, ${result.sys.country}`;  // a function declaration of the "result" to show it plu we add a name and sys.country to it (they are taken from the console.log)
}

getOurDate();                     // A current shown DATE will be here (calling a function) - the function itself is declared outside below (scroll down to see)

// selecting the HTML items next:

let temperature = document.querySelector("#temperature");
temperature.innerHTML = `${Math.round(result.main.temp)}<span>°C</span>`;    // .innerHTML is used here to be able to display the degree sign without span tags (textContent won't work in this case)
                                            //Math.round() - to hide decimals and only show integer numbers

let feelsLike = document.querySelector("#feelsLike");
feelsLike.innerHTML = "Feels like: "+ `${Math.round(result.main.feels_like)}<span>°C</span>`;

let conditions = document.querySelector("#conditions");
conditions.textContent = `${result.weather[0].description}`;

let variation = document.querySelector("#variation");
variation.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°C</span>` + " Max: " + `${Math.round(result.main.temp_max)}<span>°C</span>`;
}



// **** Declaring a function to show the date of the place we are looking up to:

function getOurDate() {  // Getting current date of the called location after using an API call

        // 1 - define today's date (new .getDay())

const myDate = new Date();                                                                       //today's date first
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];    // then list week days (start from Sunday!)
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let weekDay = days[myDate.getUTCDay()];             // 2 - show a day of the week (.getDay() usually), but when using arrays, it will be: days[myDate.getDay()] - remember that!   
let todayDate = myDate.getUTCDate();                // 3 - show a date 
let thisMonth = months[myDate.getUTCMonth()];       // 4 - show a month
let year = myDate.getUTCFullYear();                 // 5 - show a year

let showDate = document.querySelector("#date");
showDate.textContent = `${weekDay}` + "," + " " + `${todayDate}` + " " + `${thisMonth}` + " " + `${year}`;
}