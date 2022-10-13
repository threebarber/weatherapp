function createUrl(location) {
  return (
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&&APPID=5dc4595ee9ea25070e41e0aab0ea0c82&q=" +
    location
  );
}

async function retrieveJson(url) {
  try {
    console.log(`fetching URL: ${url}`);
    const respRaw = await fetch(url);
  
    console.log("waiting for data....");
    const responseData = await respRaw.json();
    console.log(responseData);
    return responseData;

  } catch (error) {
    console.log(`Error occurred: ${error}`);
    alert(`An error occured: ${error}`);
  }
  
}



function displayWeather(jsonData){

    var locationElement = document.querySelector("#locationText");
    var tempElement = document.querySelector("#tempText");

    var weatherElement = document.querySelector("#weatherDescriptionText");
    var minMaxElement = document.querySelector("#minMaxText");


    locationElement.textContent = jsonData.name;
    tempElement.textContent = `Temp: ${jsonData.main.temp}`;
    weatherElement.textContent = jsonData.weather[0].main;
    minMaxElement.textContent = `Min: ${jsonData.main.temp_min} Max: ${jsonData.main.temp_max}`;



}



async function run(){
    let url = createUrl("towson");
    let jsonData = await retrieveJson(url);
    displayWeather(jsonData);
}
