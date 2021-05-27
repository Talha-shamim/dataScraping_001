const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

var data = [];
var ranchi = [];

async function get() {
  await axios
    .get("https://pratirakshak.co.in/new-report.php")
    .then((res) => {
      const $ = cheerio.load(res.data);
      $(`#dataTable > tbody > tr > td`).each((index, element) => {
        data.push($(element).text().trim());
      });

      m = 0;
      k = 1;
      l = 2;
      x = 3;
      y = 4;
      z = 5;
      a = 6;
      b = 7;
      c = 8;
      for (var i = 0; i < data.length && z < data.length; i++) {
        var objData = {
          hospitalName: data[m],
          phoneNo: data[k],
          normalBedTotal: data[x],
          normalBedOccupied: data[y],
          normalBedAvailable: data[z],
          oxygenBedTotal: data[a],
          oxygenBedOccupied: data[b],
          oxygenBedAvailable: data[c],
          state: "Jharkhand",
          district: "Ranchi",
          hospitalAddress: "Not Available",
          lastUpdatedDate: "-",
          lastUpdatedTime: "-",
        };

        var replacedString = objData.hospitalName.replace(" ", "+");
        var finalRepString = replacedString + "+" + "Ranchi";
        var gStringpt1 = "https://www.google.com/search?q=";
        var gStringpt3 = "&rlz=1C1CHBF_enIN859IN859&oq=";
        var gStringpt5 =
          "&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8";
        var finalString =
          gStringpt1 +
          finalRepString +
          gStringpt3 +
          finalRepString +
          gStringpt5;

        objData.googleSearch = finalString;

        m += 13;
        k += 13;
        l += 13;
        z += 13;
        x += 13;
        y += 13;
        a += 13;
        b += 13;
        c += 13;
        ranchi.push(objData);
      }

      fs.writeFile(
        "jsonFiles/ranchi.json",
        JSON.stringify(ranchi, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written ranchi");
        }
      );

      fs.writeFile(
        "jsonFiles/jharkhand.json",
        JSON.stringify(ranchi, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written Jharkhand");
        }
      );
    })

    .catch((error) => {
      console.log(error);
    });
}

exports.getranchi = get;
