const pudu = require("../puducherry.json");
const fs = require("fs");
const googleScrapper = require('../../puppeteer/googleScrapper')


var coordinatesData = [];

pudu.map((datas) => {
  googleScrapper.google(datas.googleSearch).then((res) => {
    if (res.location) {
      coordinatesData.push(res);

      fs.writeFile(
        `jsonFiles/Coordinates/puducherrycoordinates.json`,
        JSON.stringify(coordinatesData, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("puddu coordmaker");
        }
      );
    }
  });
});
