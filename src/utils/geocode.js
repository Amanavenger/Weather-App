const request = require("request");


const geoCode = (address, callback) => {
  const key ="pk.eyJ1IjoiZGFudGhlZGIiLCJhIjoiY2wyNzhqajRiMDN0cDNjbDgzbGJwMXhoeSJ9.oflsb6yJFBe6CVubaVzIGA";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to Connect location Server!!", undefined);
     }
    else if(response.body.message === "Not Authorized - No Token") {
      callback("Enter Valid Name!!");
    }
    else if (response.body.features.length === 0) {
      callback("No location Found", undefined);
    }
     else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};


module.exports =geoCode;