const uttar = require("../uttarpradesh.json");
const fs = require("fs");
const googleScrapper = require('../../puppeteer/googleScrapper')


var coordinatesData = [];

uttar.map((datas) => {
  googleScrapper.google(datas.googleSearch).then((res) => {
    if (res.location) {
      coordinatesData.push(res);

      fs.writeFile(
        `jsonFiles/Coordinates/uttarpradeshcoordinates.json`,
        JSON.stringify(coordinatesData, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("UP ccoordmaker");
        }
      );
    }
  });
});
