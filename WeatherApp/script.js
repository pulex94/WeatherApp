// VARIABLE
let locationInfoDisplay = document.getElementById("locationInfoDisplay");
let locationInfoBtn = document.getElementById("locationInfoBtn");
let locationInfoInput = document.getElementById("locationInfoInput");
let locationWeatherInfo = document.getElementById("locationWeatherInfo");
let dayOrNight;
// EVENT LISTENER
locationInfoInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    locationInfoBtn.click();
  }
});

locationInfoBtn.addEventListener("click", getWeather);

// MAIN FUNCTION THAT FETCH WEATHER
async function getWeather() {
  try {
    const responseCityInfo = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=0afb1578fa6d4d4d83272513230611&q=" +
        locationInfoInput.value
    );

    const dataCityInfo = await responseCityInfo.json();

    const locationInfo = await {
      name: dataCityInfo.location.name,
      region: dataCityInfo.location.region,
      country: dataCityInfo.location.country,
      weather: dataCityInfo.current.condition.text,
      time: dataCityInfo.current.is_day,
      temp: dataCityInfo.current.temp_c,
      humidity: dataCityInfo.current.humidity,
      wind: dataCityInfo.current.wind_kph,
      pressure: dataCityInfo.current.pressure_mb,
    };
    dayOrNight = locationInfo.time;

    clearDisplay();
    displayInfoText(locationInfo);
    getWeatherInfo();
    displayInfoWeather(locationInfo);
  } catch (error) {
    errorState();
  }
}

// DISPLAY THE TITLE + SUBTITLES
function displayInfoText(locationInfo) {
  const h6 = document.createElement("h6");
  const h1 = document.createElement("h1");
  const h4 = document.createElement("h4");

  locationInfoDisplay.appendChild(h6);
  locationInfoDisplay.appendChild(h1);
  locationInfoDisplay.appendChild(h4);

  h1.textContent = locationInfo.country;
  h4.textContent = locationInfo.weather;
  h6.textContent = locationInfo.region + " , " + locationInfo.name;
}

// DISPLAY THE INFO HUMIDITY ECC
function displayInfoWeather(locationInfo) {
  const temp = document.createElement("h6");
  const humidity = document.createElement("h6");
  const wind = document.createElement("h6");
  const pressure = document.createElement("h6");

  locationWeatherDisplay.appendChild(temp);
  locationWeatherDisplay.appendChild(humidity);
  locationWeatherDisplay.appendChild(wind);
  locationWeatherDisplay.appendChild(pressure);

  temp.textContent = "TEMP. C: " + locationInfo.temp;
  humidity.textContent = "HUMIDITY " + locationInfo.humidity;
  wind.textContent = "WIND: " + locationInfo.wind;
  pressure.textContent = "PRESSURE: " + locationInfo.pressure;
}

// CLEAR THE DISPLAY VALUE
function clearDisplay() {
  locationInfoDisplay.innerHTML = "";
}
// PUT ICON ON DISPLAY
async function getWeatherInfo() {
  let h4 = document.querySelector("h4");
  let img = document.createElement("img");
  let locationWeatherDisplay = document.getElementById(
    "locationWeatherDisplay"
  );
  locationWeatherDisplay.innerHTML = "";
  locationWeatherDisplay.appendChild(img);

  const responseWeatherInfo = await fetch(
    "https://www.weatherapi.com/docs/weather_conditions.json"
  );
  const dataWeatherInfo = await responseWeatherInfo.json();

  for (let i = 0; i < dataWeatherInfo.length; i++) {
    const element = dataWeatherInfo[i];
    if (element.day == h4.textContent || element.night == h4.textContent) {
      img.src = "icons/day/" + element.icon + ".png";
    }
  }
}

function errorState() {
  clearDisplay();
  let h1 = document.createElement("h1");
  h1.innerHTML = "404 ERROR! <br> City Not Found";
  locationInfoDisplay.appendChild(h1);
  locationWeatherDisplay.innerHTML = "";
}
