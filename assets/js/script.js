var searchBtn = document.querySelector("#searchBtn");
var cityForm = document.querySelector("#cityForm");

var searchHistory = document.getElementById("searchHistory");
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
    currentWeatherEl.classList.remove("d-none");
    fiveDayEl.classList.remove("d-none");
    saveSearches(cityName);
    loadSearches(cityName);
});

//add cities to local storage in a different function


var saveSearches = function(cityName) {
    var cityNames = {
        name: cityName
    };
    //var cityName = cityForm.value.trim();
    var historyButton = document.createElement("button");
    historyButton.textContent= cityName;
    searchHistory.appendChild(historyButton);
   // historyButton.setAttribute("city-Id", cityCounter)
    //cityNames.push(cityName);
    console.log(cityNames);
    
    localStorage.setItem("cityName", JSON.stringify(cityNames));
    
};
var loadSearches= function(cityNames) {
    if(localStorage.getItem("cityName", cityNames)) {
        var savedCities = localStorage.getItem("cityName",cityNames);
        savedCities = JSON.parse(savedCities);
        //savedC.split(',');
        for(var i=0; i<savedCities.length; i++) {
            var historyButton= document.createElement("button");
            historyButton.textContent= savedCities[i].name;
            historyButton.classList.add("btn","btn-primary", "d-grid", "gap-2");
            searchHistory.appendChild(historyButton);
            
        }
    
    };
    
}




searchHistory.addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        historyButtonHandler(event);
    }
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
  
    var weatherImg = document.createElement("span");
    weatherImg.innerHTML =  `<img src= http://openweathermap.org/img/w/${icon}.png alt="weather icon"/>`;
    weatherIcon.appendChild(weatherImg);

    currentCity.textContent = city + ': '+ date + '';
    currentTemp.textContent = "Temp: " + temp;
    currentWind.textContent = "Wind: " + windspeed;
    currentHumidity.textContent = "Humidity: " + humidity;
    currentUv.textContent= "UV: " + uvi;
    if (uvi <= 2) {
        currentUv.classList.add("bg-success")
    }else if(uvi>2&& uvi<5){
        currentUv.classList.add("yellowBg")
    } else if(uvi>5 && uvi<7) {
        currentUv.classList.add("orangeBg")
    } else {
        currentUv.classList.add("bg-danger")
    };

    currentWeatherList.appendChild(currentTemp, currentWind, currentHumidity, currentUv);
 

    daily.splice(6)
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
        futureWeather.appendChild(weatherImg);
        futureWeather.appendChild(listGroup);
        listGroup.appendChild(dailyTemp);
        listGroup.appendChild(dailyWind);
        listGroup.appendChild(dailyHum);
    }


}


//Uv should be color coded 




//5 day forecast should be cards

//search history made into buttons

//local storage for search history???

