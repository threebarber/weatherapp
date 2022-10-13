function createUrl(location) {
  return (
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&&APPID=5dc4595ee9ea25070e41e0aab0ea0c82&q=" +
    location
  );
}

async function retrieveJson(url) {
  console.log(`fetching URL: ${url}`);
  const respRaw = await fetch(url);

  console.log("waiting for data....");
  const responseData = await respRaw.json();
  return responseData;
}
