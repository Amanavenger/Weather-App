const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const key_openWeather = "173b85127b29e2a24df68aceb7720cbd";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key_openWeather}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to Connect Weather Server!!!", undefined);
    } else if (response.body.cod == 400) {
      callback("Invalid Location", undefined);
    } else {
      var temp_c = parseFloat(response.body.main.temp - 273.15).toFixed(2);

      callback(
        undefined,
        "It is currently " +
          temp_c +
          "°C. " +
          response.body.weather[0].description
      );
    }
  });
};

module.exports = forecast;
