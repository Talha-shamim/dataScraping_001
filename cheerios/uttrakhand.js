const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

var data = [];
var uttrakhand = [];

async function get() {
  await axios
    .get("https://covid19.uk.gov.in/bedssummary.aspx")
    .then((res) => {
      const $ = cheerio.load(res.data);
      $(`#grdhospitalbeds > tbody > tr > td`).each((index, element) => {
        data.push($(element).text().trim());
        console.log($(element).text().trim());
      });

      m = 0;
      k = 1;
      a = 3;
      b = 4;
      o = 2;
      t = 7;
      for (var i = 0; t < data.length; i++) {
        var objData = {
          district: data[m],
          state: "Uttrakhand",
          hospitalName: data[k].split("\n")[0],
          hospitalAddress: "NA",
          normalBedTotal: data[a].split("/")[1],
          normalBedOccupied: data[a].split("/")[0],
          normalBedAvailable: "-",
          oxygenBedTotal: data[b].split("/")[1],
          oxygenBedOccupied: data[b].split("/")[0],
          oxygenBedAvailable: "-",
          phoneNo: data[o].split("\n")[1],
          lastUpdatedDate: data[t].split(" ")[0],
          lastUpdatedTime: data[t].split(" ")[1],
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

        m += 7;
        k += 7;
        a += 7;
        b += 7;
        o += 7;
        t += 7;
        uttrakhand.push(objData);
      }

      fs.writeFile(
        "jsonFiles/uttarakhand.json",
        JSON.stringify(uttrakhand, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written uttrakhand");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.getuttrakhand = get;
