// API Connectivity Details
const api = {
    key: "b834c03ceced267afdd22654c4279ac2",
    base: "https://api.openweathermap.org/data/2.5/weather"
}
// Add action listner
document.getElementById("entered_city").addEventListener('change', getWeatherInformation);

//Current date and time
document.getElementById('date-time').innerHTML=dateBuilder(new Date());
// Get weather information 
function getWeatherInformation() {
    var entered_city = document.getElementById("entered_city").value;

    if (entered_city === '' || entered_city === undefined) {
        alert("Enter the city!")
        return;
    }

    getResults(entered_city);
}

//Fetch results from weather api
function getResults(entered_city) {

    //Construct api
    const url = `${api.base}?q=${entered_city}&units=metric&appid=${api.key}`
    //Fetch data from api
    fetch(url).then((weather) => {
        return weather.json()
    }).then((response) => {
        console.log(response)
        displayResults(response);
    })
}

//Load data to DOM
function displayResults(response) {
    // Load Data to DOM
    document.getElementById("CityNCountry").innerText = response.name + " " + response.sys.country;
    document.getElementById("DayDateTime").innerText = dateBuilder(new Date())
    document.getElementById("CurrentTemp").innerText = Math.round( response.main.feels_like) + '°c'
    document.getElementById("WeatherType").innerText = response.weather[0].main
    document.getElementById("MinMaxTemp").innerText = Math.round(response.main.temp_min) + '°c / ' + Math.round(response.main.temp_max) + '°c'
}

//Constructing date
function dateBuilder(date) {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
}


