//Searching Items
var citySearch = document.querySelector("#citySearch");
var searchBtn = document.querySelector("#search");
//Aside Buttons
var recentArea1 = document.querySelector("#recentArea1");
var recentArea2 = document.querySelector("#recentArea2");
var recentArea3 = document.querySelector("#recentArea3");
var recentArea4 = document.querySelector("#recentArea4");
var recentArea5 = document.querySelector("#recentArea5");
var recentArea6 = document.querySelector("#recentArea6");
var recentArea7 = document.querySelector("#recentArea7");
var recentArea8 = document.querySelector("#recentArea8");
//CurrentDate
var currentDateCityName = document.querySelector("#currentDateCityName");
var currentDate = document.querySelector("#currentDate");
var cdTemp = document.querySelector("#currentDateTemp");
var cdWind = document.querySelector("#currentDateWind");
var cdHumidity = document.querySelector("#currentDateHumidity");
var cdUVI = document.querySelector("#currentDateUVI");

//Day1
var day1P = document.querySelector("#day1");
var day1Image = document.querySelector("#day1Image");
var day1Temp = document.querySelector("#day1Temp");
var day1Wind = document.querySelector("#day1Wind");
var day1Humidity = document.querySelector("#day1Humidity");
//Day2
var day2P = document.querySelector("#day2");
var day2Image = document.querySelector("#day2Image");
var day2Temp = document.querySelector("#day2Temp");
var day2Wind = document.querySelector("#day2Wind");
var day2Humidity = document.querySelector("#day2Humidity");
//Day3
var day3P = document.querySelector("#day3");
var day3Image = document.querySelector("#day3Image");
var day3Temp = document.querySelector("#day3Temp");
var day3Wind = document.querySelector("#day3Wind");
var day3Humidity = document.querySelector("#day3Humidity");
//Day4
var day4P = document.querySelector("#day4");
var day4Image = document.querySelector("#day4Image");
var day4Temp = document.querySelector("#day4Temp");
var day4Wind = document.querySelector("#day4Wind");
var day4Humidity = document.querySelector("#day4Humidity");
//Day5
var day5P = document.querySelector("#day5");
var day5Image = document.querySelector("#day5Image");
var day5Temp = document.querySelector("#day5Temp");
var day5Wind = document.querySelector("#day5Wind");
var day5Humidity = document.querySelector("#day5Humidity");
//Put all the aside buttons back to there set value
recentArea1.innerHTML = localStorage.getItem("city1");
recentArea2.innerHTML = localStorage.getItem("city2");
recentArea3.innerHTML = localStorage.getItem("city3");
recentArea4.innerHTML = localStorage.getItem("city4");
recentArea5.innerHTML = localStorage.getItem("city5");
recentArea6.innerHTML = localStorage.getItem("city6");
recentArea7.innerHTML = localStorage.getItem("city7");
recentArea8.innerHTML = localStorage.getItem("city8");


//Establish dates
let today = new Date();
var mm = String(today.getMonth() + 1).padStart(2, '0');
var dd = String(today.getDate()).padStart(2, '0');
var yyyy = today.getFullYear();
today = mm + "/" + dd + "/" + yyyy;

let day1 = new Date();
day1.setDate(day1.getDate() + 1);
var day1MM = String(day1.getMonth() + 1).padStart(2, "0");
var day1DD = String(day1.getDate()).padStart(2, '0');
var day1YYYY = day1.getFullYear();
day1 = day1MM + "/" + day1DD + "/" + day1YYYY;

let day2 = new Date();
day2.setDate(day2.getDate() + 2);
var day2MM = String(day2.getMonth() + 1).padStart(2, "0");
var day2DD = String(day2.getDate()).padStart(2, "0");
var day2YYYY = day2.getFullYear();
day2 = day2MM + "/" + day2DD + "/" + day2YYYY;

let day3 = new Date();
day3.setDate(day3.getDate() + 3);
var day3MM = String(day3.getMonth() + 1).padStart(2, "0");
var day3DD = String(day3.getDate()).padStart(2, "0");
var day3YYYY = day3.getFullYear();
day3 = day3MM + "/" + day3DD + "/" + day3YYYY;

let day4 = new Date();
day4.setDate(day4.getDate() + 4);
var day4MM = String(day4.getMonth() + 1).padStart(2, "0");
var day4DD = String(day4.getDate()).padStart(2, "0");
var day4YYYY = day4.getFullYear();
day4 = day4MM + "/" + day4DD + "/" + day4YYYY;

let day5 = new Date();
day5.setDate(day5.getDate() + 5);
var day5MM = String(day5.getMonth() + 1).padStart(2, "0");
var day5DD = String(day5.getDate()).padStart(2, "0");
var day5YYYY = day5.getFullYear();
day5 = day5MM + "/" + day5DD + "/" + day5YYYY;

//Put dates on the screen
currentDate.innerHTML = today;
day1P.innerHTML = day1;
day2P.innerHTML = day2;
day3P.innerHTML = day3;
day4P.innerHTML = day4;
day5P.innerHTML = day5;

//When someone clicks this button do a fetch call and have the call 
//search for the latitude and longitude of the city the person was
//searching for
searchBtn.addEventListener("click", searchCitysWeather);

let lati;
let long;

function searchCitysWeather () {

    var requestLatiLong = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch.value + '&limit=5&appid=f426e40706010339d3b27f2fcb5fd479';

    fetch(requestLatiLong)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var coordinates = {
        lati : data[0].lat,
        long : data[0].lon
      }
      return coordinates;
    })
    //Then plug the latitude and longitude into a different fetch call
    //and return the forecast for the week
    .then (function(location){
      var requestForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + location.lati + "&lon=" + location.long + "&units=imperial&exclude=minutely,hourly,alerts,current&appid=f426e40706010339d3b27f2fcb5fd479";
      fetch(requestForecast)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        showTheWeather(data);
      })
    })


}
//Display the forecast and weather icons on the screen
function showTheWeather(weatherData) {

    currentDateCityName.innerHTML = citySearch.value;

    cdTemp.innerHTML = weatherData.daily[0].temp.day;
    cdWind.innerHTML = weatherData.daily[0].wind_speed;
    cdHumidity.innerHTML = weatherData.daily[0].humidity;
    cdUVI.innerHTML = weatherData.daily[0].uvi;

    day1Image.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherData.daily[1].weather[0].icon + "@2x.png");
    day1Image.setAttribute("alt", weatherData.daily[1].weather[0].description);
    day1Temp.innerHTML = weatherData.daily[1].temp.day;
    day1Wind.innerHTML = weatherData.daily[1].wind_speed;
    day1Humidity.innerHTML = weatherData.daily[1].humidity;

    day2Image.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherData.daily[2].weather[0].icon + "@2x.png");
    day2Image.setAttribute("alt", weatherData.daily[2].weather[0].description);
    day2Temp.innerHTML = weatherData.daily[2].temp.day;
    day2Wind.innerHTML = weatherData.daily[2].wind_speed;
    day2Humidity.innerHTML = weatherData.daily[2].humidity;

    day3Image.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherData.daily[3].weather[0].icon + "@2x.png");
    day3Image.setAttribute("alt", weatherData.daily[3].weather[0].description);
    day3Temp.innerHTML = weatherData.daily[3].temp.day;
    day3Wind.innerHTML = weatherData.daily[3].wind_speed;
    day3Humidity.innerHTML = weatherData.daily[3].humidity;

    day4Image.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherData.daily[4].weather[0].icon + "@2x.png");
    day4Image.setAttribute("alt", weatherData.daily[4].weather[0].description);
    day4Temp.innerHTML = weatherData.daily[4].temp.day;
    day4Wind.innerHTML = weatherData.daily[4].wind_speed;
    day4Humidity.innerHTML = weatherData.daily[4].humidity;

    day5Image.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherData.daily[5].weather[0].icon + "@2x.png");
    day5Image.setAttribute("alt", weatherData.daily[5].weather[0].description);
    day5Temp.innerHTML = weatherData.daily[5].temp.day;
    day5Wind.innerHTML = weatherData.daily[5].wind_speed;
    day5Humidity.innerHTML = weatherData.daily[5].humidity;

    storeTheCities();
}

function storeTheCities() {
    

    //Getting Local Storage Items
    let city1 = localStorage.getItem("city1");
    let city2 = localStorage.getItem("city2");
    let city3 = localStorage.getItem("city3");
    let city4 = localStorage.getItem("city4");
    let city5 = localStorage.getItem("city5");
    let city6 = localStorage.getItem("city6");
    let city7 = localStorage.getItem("city7");
    let city8 = localStorage.getItem("city8");

    //Shuffle Items
    city8 = city7;
    city7 = city6;
    city6 = city5;
    city5 = city4;
    city4 = city3;
    city3 = city2;
    city2 = city1;
    city1 = citySearch.value;

    //Set Items
    localStorage.setItem("city1", city1);
    localStorage.setItem("city2", city2);
    localStorage.setItem("city3", city3);
    localStorage.setItem("city4", city4);
    localStorage.setItem("city5", city5);
    localStorage.setItem("city6", city6);
    localStorage.setItem("city7", city7);
    localStorage.setItem("city8", city8);

    //Display Items
    recentArea1.innerHTML = city1;
    recentArea2.innerHTML = city2;
    recentArea3.innerHTML = city3;
    recentArea4.innerHTML = city4;
    recentArea5.innerHTML = city5;
    recentArea6.innerHTML = city6;
    recentArea7.innerHTML = city7;
    recentArea8.innerHTML = city8;
}
//All the aside buttons awaiting a click to then search for there set value
recentArea1.addEventListener("click", recentArea1Click);
recentArea2.addEventListener("click", recentArea2Click);
recentArea3.addEventListener("click", recentArea3Click);
recentArea4.addEventListener("click", recentArea4Click);
recentArea5.addEventListener("click", recentArea5Click);
recentArea6.addEventListener("click", recentArea6Click);
recentArea7.addEventListener("click", recentArea7Click);
recentArea8.addEventListener("click", recentArea8Click);

function recentArea1Click () {
  citySearch.value = localStorage.getItem("city1");
  searchCitysWeather();
}

function recentArea2Click () {
  citySearch.value = localStorage.getItem("city2");
  searchCitysWeather();
}

function recentArea3Click () {
  citySearch.value = localStorage.getItem("city3");
  searchCitysWeather();
}

function recentArea4Click () {
  citySearch.value = localStorage.getItem("city4");
  searchCitysWeather();
}

function recentArea5Click () {
  citySearch.value = localStorage.getItem("city5");
  searchCitysWeather();
}

function recentArea6Click () {
  citySearch.value = localStorage.getItem("city6");
  searchCitysWeather();
}

function recentArea7Click () {
  citySearch.value = localStorage.getItem("city7");
  searchCitysWeather();
}

function recentArea8Click () {
  citySearch.value = localStorage.getItem("city8");
  searchCitysWeather();
}
