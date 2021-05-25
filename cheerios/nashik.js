const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

var data = [];
var Nashik = [];

async function get() {
  await axios
    .get("http://covidcbrs.nmc.gov.in/home/hospitalSummary")
    .then((res) => {
      const $ = cheerio.load(res.data);
      $(`#DCHC > tbody > tr > td`).each((index, element) => {
        data.push($(element).text().trim());
      });

      m = 1;
      k = 4;
      l = 5;
      x = 6;
      y = 7;
      z = 8;
      a = 9;
      b = 10;
      c = 11;
      for (var i = 0; i < data.length && c < data.length; i++) {
        var objData = {
          hospitalName: data[m],
          normalBedTotal: data[k],
          normalBedOccupied: data[l],
          oxygenBedTotal: data[x],
          oxygenBedOccupied: data[y],
          icuBedTotal: data[z],
          icuBedOccupied: data[a],
          ventilatorsBedTotal: data[b],
          ventilatorsBedOccupied: data[c],

          state: "Maharashtra",
          district: "Nashik",
          hospitalAddress: "NA",
          lastUpdatedDate: "NA",
          lastUpdatedTime: "NA",
        };

        m += 11;
        k += 11;
        l += 11;
        z += 11;
        x += 11;
        y += 11;
        a += 11;
        b += 11;
        c += 11;
        Nashik.push(objData);
      }

      fs.writeFile(
        "jsonFiles/Nashik.json",
        JSON.stringify(Nashik, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written Nashik");
        }
      );

      fs.writeFile(
        "jsonFiles/Maharashtra.json",
        JSON.stringify(Nashik, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written Maharashtra");
        }
      );
    })

    .catch((error) => {
      console.log(error);
    });
}
get();
