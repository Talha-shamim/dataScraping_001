const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

var hospitalNameAddressPhone = [];
var lastUpdated = [];
var capacityData = [];
var availableData = [];
var allahabad = [];

async function get() {
  await axios
    .get("http://monitor.covid19reportprayagraj.in/hospitalbeds.aspx")
    .then((res) => {
      const $ = cheerio.load(res.data);
      $(`#dgv > tbody > tr > td:nth-child(1)`).each((index, element) => {
        hospitalNameAddressPhone.push($(element).text().trim());
      });

      $(`#dgv > tbody > tr > td:nth-child(2)`).each((index, element) => {
        lastUpdated.push($(element).text().trim());
      });

      $(`#dgv > tbody > tr > td:nth-child(4) > span`).each((index, element) => {
        capacityData.push($(element).text().trim());
      });

      $(`#dgv > tbody > tr > td:nth-child(5) > span`).each((index, element) => {
        availableData.push($(element).text().trim());
      });

      for (var i = 0; i < hospitalNameAddressPhone.length; i++) {
        var objData = {
          state: "Uttarpradesh",
          hospitalName: hospitalNameAddressPhone[i].split("\n")[0],
          hospitalAddress: hospitalNameAddressPhone[i].split("\n")[1],
          phoneNo: hospitalNameAddressPhone[i].split("\n")[2],
          lastUpdateDate: lastUpdated[i].split("\n")[0],
          lastUpdateTime: lastUpdated[i].split("\n")[1],
          district: "Allahabad",
        };

        var j = i * 5 - 1;

        var icuCap = capacityData[j + 1];
        var o2Cap = capacityData[j + 3];
        var withouto2Cap = capacityData[j + 4];

        var icuAvail = availableData[j + 1];
        var o2Avail = availableData[j + 3];
        var withouto2Avail = availableData[j + 4];

        objData.icuCapacity = icuCap;
        objData.icuAvailability = icuAvail;

        objData.oxygenBedCapacity = o2Cap;
        objData.oxygenBedAvailability = o2Avail;
        objData.oxygenBedOccupied = o2Cap - o2Avail;

        objData.normalBedCapacity = withouto2Cap;
        objData.normalBedAvailability = withouto2Avail;
        objData.normalBedOccupied = withouto2Cap - withouto2Avail;

        allahabad.push(objData);
      }

      var replacedString = objData.hospitalName.replace(" ", "+");
      var finalRepString = replacedString + "+" + "Allahabad";
      var gStringpt1 = "https://www.google.com/search?q=";
      var gStringpt3 = "&rlz=1C1CHBF_enIN859IN859&oq=";
      var gStringpt5 =
        "&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8";
      var finalString =
        gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5;

      objData.googleSearch = finalString;

      fs.writeFile(
        "jsonFiles/allahabad.json",
        JSON.stringify(allahabad, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written Allahabad");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.getAllahabad = get;
