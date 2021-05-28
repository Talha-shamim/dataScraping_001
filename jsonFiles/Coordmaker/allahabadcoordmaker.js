const allahabad = require("../allahabad.json");
const googleData = require("../../puppeteer/googleScrapper");
const fs = require("fs");
var ranchicoord = [];

allahabad.map((dt) => {
  googleData.google(dt.googleSearch).then((x) => {
    if (x.location) {
      ranchicoord.push(x);
      fs.writeFile(
        `jsonFiles/Coordinates/allahabadcoordinates.json`,
        JSON.stringify(ranchicoord, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`allahabad coordmaker`);
          }
        }
      );
    }
  });
});
