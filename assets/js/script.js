var searchBtn = document.querySelector("#searchBtn");
var cityForm = document.querySelector("#cityForm");
//get weather data from weather API

var getWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon="+ lon +"&appid=59a868aae444950a6d26f070902f6d03";
    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                return data;
            })
        } else {
            console.log("location not found")
        }
    })
    .catch(function(error) {
        console.log("network error");
    });
}

getWeather(40.76, -111.89);

//get coordinates from mapping service ?


var getCords = function(city) {
    var apiUrlCord = "http://api.positionstack.com/v1/forward?access_key=56802c3a1a281b0b65e50cf07bb5ca7b&query=" +city+ "&limit=1";
    fetch(apiUrlCord)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data[0, 'latitude']);
                return data;
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
    console.log(cityName);
    console.log("you clicked the search button");
});

//Uv should be color coded 




//5 day forecast should be cards

//search history made into buttons

//local storage for search history???

