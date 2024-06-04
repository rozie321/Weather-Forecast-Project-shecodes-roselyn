function refreshWeather(response){
    let temperatureElement = document.querySelector("#current-temperature-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windSpeedElement=document.querySelector("#wind-speed");
    let timeElement =document.querySelector("#current-date");
    let date =new Date(response.data.time * 1000);
    let iconElement=document.querySelector("#icon");
    
    
    iconElement.innerHTML=`<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
    cityElement.innerHTML=response.data.city;
    timeElement.innerHTML=formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML=response.data.condition.description;
    humidityElement.innerHTML=`${response.data.temperature.humidity}% `;
    windSpeedElement.innerHTML=`${response.data.wind.speed}km/h `;


}


function searchCity(city){
    let apiKey = "f0edft08a334d1a9c4eb5o0155c624af";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function HandleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");

    searchCity(searchInput.value);

}



let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit",HandleSearchSubmit);

searchCity("Paris");

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }