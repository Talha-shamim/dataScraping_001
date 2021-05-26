const pune = require("../pune.json");
const navimumbai = require("../navimumbai.json");
const googleScrapper = require("../../puppeteer/googleScrapper.js");
const fs = require("fs");

const maharastra = pune.concat(navimumbai);

// maharastra.map((dt) => {
//   googleMaharastra.map((gdt) => {
//     if (dt.googleSearch === gdt.url) {
//       dt.hospitalAddress = gdt.location;
//       dt.phoneNo = gdt.phone;
//       dt.lattitude = gdt.cordlat;
//       dt.longitude = gdt.cordlon;
//     }
//   });
// });

var coordinatesData = [];

maharastra.map((datas) => {
  googleScrapper.google(datas.googleSearch).then((res) => {
    if (res.location) {
      coordinatesData.push(res);

      fs.writeFile(
        `jsonFiles/coordinates/coordinatesData.json`,
        JSON.stringify(coordinatesData, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("coordinatesData");
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
