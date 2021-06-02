const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

var data = [];
var rajasthan = [];

async function get() {
  await axios
    .get(
      "https://covidinfo.rajasthan.gov.in/Covid-19hospital-wisebedposition-wholeRajasthan.aspx"
    )
    .then((res) => {
      const $ = cheerio.load(res.data);
      $(`#ContentPlaceHolder1_ExportDiv > table > tbody > tr > td`).each(
        (index, element) => {
          data.push($(element).text().trim());
        }
      );

      m = 18;
      k = 19;
      a = 20;
      b = 21;
      c = 22;
      x = 23;
      y = 24;
      z = 25;
      o = 32;
      t = 34;
      for (var i = 0; t < data.length; i++) {
        var objData = {
          district: data[m],
          state: "Rajasthan",
          hospitalName: data[k],
          hospitalAddress: "Not Available",
          normalBedTotal: data[a],
          normalBedOccupied: data[b],
          normalBedAvailable: data[c],
          oxygenBedTotal: data[x],
          oxygenBedOccupied: data[y],
          oxygenBedAvailable: data[z],
          phoneNo: data[o],
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

        m += 18;
        k += 18;
        a += 18;
        b += 18;
        c += 18;
        x += 18;
        y += 18;
        z += 18;
        o += 18;
        t += 18;
        rajasthan.push(objData);
      }

      fs.writeFile(
        "jsonFiles/rajasthan.json",
        JSON.stringify(rajasthan, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written rajasthan");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.getrajasthan = get;
