document.querySelector("#searchButton").addEventListener("click", function () {
  if(!document.querySelector("#searchInput").validity.valueMissing){
    run();
  }else{
    alert("Enter a location, zip code or search term");
  }
});

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

function displayWeather(jsonData) {
  var locationElement = document.querySelector("#locationText");
  var tempElement = document.querySelector("#tempText");

  var weatherElement = document.querySelector("#weatherDescriptionText");
  var minMaxElement = document.querySelector("#minMaxText");

  let statusCode = jsonData.cod;

  console.log(`RESPONSE CODE: ${statusCode}`);

  if (statusCode == "200") {
    locationElement.textContent = jsonData.name;
    tempElement.textContent = `Temp: ${jsonData.main.temp}`;
    weatherElement.textContent = jsonData.weather[0].main;
    minMaxElement.textContent = `Min: ${jsonData.main.temp_min} Max: ${jsonData.main.temp_max}`;
  }else{
    tempElement.textContent = `Error Occurred: ${statusCode}`;

    locationElement.textContent = "";
    weatherElement.textContent = "";
    minMaxElement.textContent = "";

  }
}

async function run() {
  let userSearchInput = document.querySelector("#searchInput").value;
  let url = createUrl(userSearchInput);
  let jsonData = await retrieveJson(url);
  displayWeather(jsonData);
}
