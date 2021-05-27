const Goa = require('../goa.json')
const fs = require("fs");
const googleScrapper = require('../../puppeteer/googleScrapper')


var coordinatesData = [];

Goa.map((datas) => {
  googleScrapper.google(datas.googleSearch).then((res) => {
    if (res.location) {
      coordinatesData.push(res);

      fs.writeFile(
        `jsonFiles/Coordinates/goacoordinates.json`,
        JSON.stringify(coordinatesData, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("Goa coordmaker");
        }
      );
    }
  });
});


