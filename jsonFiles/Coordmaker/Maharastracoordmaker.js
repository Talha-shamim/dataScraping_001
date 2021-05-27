const pune = require("../pune.json");
const navimumbai = require("../navimumbai.json");
const googleScrapper = require("../../puppeteer/googleScrapper.js");
const fs = require("fs");

const maharastra = pune.concat(navimumbai);
var coordinatesData = [];

maharastra.map((datas) => {
  googleScrapper.google(datas.googleSearch).then((res) => {
    if (res.location) {
      coordinatesData.push(res);

      fs.writeFile(
        `jsonFiles/Coordinates/maharastracoordinates.json`,
        JSON.stringify(coordinatesData, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("maharstra coordmaker");
        }
      );
    }
  });
});

fs.writeFile(
  `jsonFiles/maharastra.json`,
  JSON.stringify(maharastra, null, 2),
  (error) => {
    if (error) {
      console.log(error);
    } else console.log("maharashrtra merge");
  }
);
