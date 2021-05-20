const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

var data = [];
var uttarPradesh = [];

async function get() {
  await axios
    .get("http://dgmhup.gov.in/en/CovidReport")
    .then((res) => {
      const $ = cheerio.load(res.data);
      $(`#MainContent_EN_grd_data > tbody > tr >td`).each((index, element) => {
        data.push($(element).text().trim());
      });

      m = 0;
      l = 4;
      a = 7;
      b = 9;
      c = 11;
      for (var i = 0; c < data.length; i++) {
        var objData = {
          district: data[m],
          hospitalName: data[l],
          hospitalAddress: "NA",
          state: "UttarPradesh",
          lastUpdatedDate: "NA",
          lastUpdatedTime: "NA",
          isolatedbed: data[a],
          icuBed: data[b],
          normalBedTotal: "-",
          normalBedOccupied: "-",
          normalBedAvailable: "-",
          oxygenBedTotal: "-",
          oxygenBedOccupied: "-",
          oxygenBedAvailable: "-",
          phoneNo: "NA",
          ventilatorBed: data[c],
        };

        var replacedString = objData.hospitalName.replace(" ", "+");
        var finalRepString = replacedString + "+" + objData.district;
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

        m += 26;
        l += 26;
        a += 26;
        b += 26;
        c += 26;
        uttarPradesh.push(objData);
      }

      fs.writeFile(
        "jsonFiles/uttarPradesh.json",
        JSON.stringify(uttarPradesh, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written uttarPradesh");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.getuttarpradesh = get;
