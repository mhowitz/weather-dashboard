var searchBtn = document.querySelector("#searchBtn");
var cityForm = document.querySelector("#cityForm");


//current weather el 

var currentWeatherEl = document.querySelector("#currentWeather");
var currentWeatherList = document.querySelector("#currentWeatherList");
var weatherImg = document.querySelector("#weatherImg");
var currentCity = document.getElementById("currentCity");
var weatherIcon = document.getElementById("weatherIcon");
var currentTemp = document.getElementById("currentTemp");
var currentWind = document.getElementById("currentWind");
var currentHumidity = document.getElementById("currentHumidity");
var currentUv= document.getElementById("currentUV")

var fiveDayEl = document.getElementById("fiveDayWeather");

//get weather data from weather API

var getWeather = function(lat, lon, city, icon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon="+ lon +"&appid=59a868aae444950a6d26f070902f6d03&units=imperial";
    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                currentWeather(city, data.current.temp, data.current.humidity, data.current.wind_speed, data.current.uvi, data.daily, icon);
                console.log(data);            })
        } else {
            currentWeatherList.textContent("location not found");
            currentWeatherEl.appendChild(currentWeatherList);
        }
    })
    .catch(function(error) {
        console.log("network error");
    });
}
//get coordinates from mapping service ?
var getCords = function(city) {
    var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59a868aae444950a6d26f070902f6d03&units=imperial`;
    fetch(cityUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                getWeather(data.coord.lat, data.coord.lon, data.name, data.weather[0].icon);
                
            })
        } else {
            console.log("location not found")
        }
    })
    .catch(function(error) {
        console.log("network error");
    });
}






searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var cityName = cityForm.value.trim();
    getCords(cityName);
    console.log("you clicked the search button");
});
//separate function to save tasks?
//not saving all, only saves the ones from that click event so probably need separte function;
//need to set current weather and daily weather to empty string so they do not stack on top of each other
//

var historyButtonHandler = function(event) {
    console.log("history button works");
    var cityHistory = event.target.textContent;
    console.log(cityHistory);
    getCords(cityHistory);
    currentWeatherEl.classList.remove("d-none");
    fiveDayEl.classList.remove("d-none");
    
}

//historyButton.addEventListener("click", historyButtonHandler);


//add attribute to each button added to screen to save to local storage?


var currentWeather = function(city, temp, humidity, windspeed, uvi, daily, icon) {
    

    var date = moment().format("dddd, MMMM Do");
  
    weatherImg = document.createElement("span");
    weatherImg.innerHTML =  "<i src= http://openweathermap.org/img/w/" + icon + ".png></i>";
    weatherIcon.appendChild(weatherImg);

    currentCity.textContent = city + ': '+ date + '';
    currentTemp.textContent = "Temp: " + temp;
    currentWind.textContent = "Wind: " + windspeed;
    currentHumidity.textContent = "Humidity: " + humidity;
    currentUv.textContent= "UV: " + uvi;

    currentWeatherList.appendChild(currentTemp, currentWind, currentHumidity, currentUv);
 

    daily.splice(6)
    console.log(daily);
    //for loop to loop through 5 daay shit
    for(var i = 1; i <daily.length; i++) {

       futureDate = daily[i].dt;


        var futureWeather =  document.createElement('div');
        futureWeather.classList.add("card", "row-cols-md-5");
        var cardHeader = document.createElement("h5");
        cardHeader.textContent= moment.unix(futureDate).format('L');
        cardHeader.classList.add("card-header");

        var listGroup = document.createElement("ul");
        var dailyTemp = document.createElement("li");
        var dailyWind = document.createElement("li");
        var dailyHum = document.createElement("li");

        var weatherImg = document.createElement("span");
        weatherImg.innerHTML =  `<img src= http://openweathermap.org/img/w/${daily[i].weather[0].icon}.png alt="weather icon"/>`;
        
        weatherImg.classList.add('justify-center')
        listGroup.classList.add("list-group", "list-group-flush")

        dailyTemp.textContent = "Temp: " + daily[i].temp.day;
        dailyWind.textContent = "Wind: " + daily[i].wind_speed;
        dailyHum.textContent = "Humidity: " + daily[i].humidity;

        

        var listClass = ['list-group-item', 'border-0']

        dailyTemp.classList.add(listClass);
        dailyWind.classList.add(listClass);
        dailyHum.classList.add(listClass);

        fiveDayEl.appendChild(futureWeather);
        futureWeather.appendChild(cardHeader);
        futureWeather.appendChild(listGroup);
        listGroup.appendChild(dailyTemp);
        listGroup.appendChild(dailyWind);
        listGroup.appendChild(dailyHum);

        console.log(daily[i].temp.day)
    }


}


//Uv should be color coded 




//5 day forecast should be cards

//search history made into buttons

//local storage for search history???

