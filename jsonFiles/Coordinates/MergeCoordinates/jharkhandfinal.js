const ranchi = require("../../ranchi.json");
const ranchiccord = require("../ranchicoordinates.json");
const fs = require("fs");

function get() {
  ranchi.map((dt) => {
    ranchiccord.map((data) => {
      if (dt.googleSearch === data.url) {
        dt.hospitalAddress = data.location;
        dt.phoneNo = data.phone;
        dt.latitude = data.cordlat;
        dt.longitude = data.cordlon;
      }
    });
  });

  fs.writeFile(
    "jsonFiles/jharkhand.json",
    JSON.stringify(ranchi, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("File written Jharkhand final");
    }
  );
}

exports.mergejharkhand = get;
