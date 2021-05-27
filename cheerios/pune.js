const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

var data = [];
var Pune = [];

async function get() {
  await axios
    .get("https://www.divcommpunecovid.com/ccsbeddashboard/hsr")
    .then((res) => {
      const $ = cheerio.load(res.data);
      $(`#tablegrid > tbody > tr > td`).each((index, element) => {
        data.push($(element).text().trim());
      });

      m = 4;
      x = 9;
      y = 10;
      a = 11;
      b = 12;

      for (var i = 0; b < data.length; i++) {
        var objData = {
          hospitalAddress: data[m].split("Address:")[1].split("\n")[0],
          hospitalName: data[m].split("Address:")[0].split("\n")[0],
          normalBedTotal: parseInt(data[x]) + parseInt(data[y]),
          normalBedOccupied: data[x],
          normalBedAvailable: data[y],
          oxygenBedTotal: parseInt(data[a]) + parseInt(data[b]),
          oxygenBedAvaiable: data[b],
          oxygenBedOccupied: data[a],
          state: "Maharashtra",
          district: "Pune",
          lastUpdatedDate: data[m].split("Date:")[1].split(" ")[0],
          lastUpdatedTime: data[m].split("Date:")[1].split(" ")[1],
        };

        var replacedString = objData.hospitalName.replace(" ", "+");
        var finalRepString = replacedString + "+" + "Pune";
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

        m += 17;
        x += 17;
        y += 17;
        a += 17;
        b += 17;

        Pune.push(objData);
      }

      fs.writeFile(
        "jsonFiles/pune.json",
        JSON.stringify(Pune, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written Pune");
        }
      );

  
    })

    .catch((error) => {
      console.log(error);
    });
}

exports.getpune = get
