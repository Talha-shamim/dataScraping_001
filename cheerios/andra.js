const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

var data = [];
var district = [];
const url = [
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=502&status=",
    name_: "anantpur",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=503&status=",
    name_: "chittoor",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=504&status=",
    name_: "y.r.s",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=505&status=",
    name_: "eastgodavari",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=506&status=",
    name_: "guntur",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=510&status=",
    name_: "krishna",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=511&status=",
    name_: "kurnool",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=515&status=",
    name_: "sprsnellore",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=517&status=",
    name_: "prakasam",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=519&status=",
    name_: "srikakulam",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=520&status=",
    name_: "visakhapatnam",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=521&status=",
    name_: "vizianagaram",
  },
  {
    urldistrict:
      "http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/process.php?hospdata=1&district=523&status=",
    name_: "westgodavari",
  },
];

async function get() {
  for (var q = 0; q < url.length; q++) {
    const single_district = [];
    console.log(q);
    await axios
      .get(url[q].urldistrict)
      .then((res) => {
        const $ = cheerio.load(res.data);
        $(`#dataTable > tbody > tr > td`).each((index, element) => {
          data.push($(element).text().trim());
        });

        m = 1;
        k = 2;
        a = 8;
        b = 9;
        c = 10;
        x = 11;
        y = 12;
        z = 13;
        for (var i = 0; z < data.length; i++) {
          var objData = {
            state: "Andra pradesh",
            hospitalName: data[m],
            hospitalAdress: "Not Available",
            district: url[q].name_,
            phoneNo: data[k],
            oxygenBedTotal: data[a],
            oxygenBedOccupied: data[b],
            oxygenBedAvailable: data[c],
            normalBedTotal: data[x],
            normalBedOccupied: data[y],
            normalBedAvailable: data[z],
            lastUpdatedDate: " - ",
            lastUpdatedTime: " - ",
          };
          m += 17;
          k += 17;
          a += 17;
          b += 17;
          c += 17;
          x += 17;
          y += 17;
          z += 17;

          var replacedString = objData.hospitalName.replace(" ", "+");
          var finalRepString = replacedString + "+" + url[q].name_;
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

          district.push(objData);
          single_district.push(objData);
        }

        fs.writeFile(
          `jsonFiles/andrapradesh.json`,
          JSON.stringify(district, null, 2),
          (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log(q);
              console.log(`File written ${url[q].name_}`);
            }
          }
        );

        fs.writeFile(
          `jsonFiles/${url[q].name_}.json`,
          JSON.stringify(single_district, null, 2),
          (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log(q);
              console.log(`File written ${url[q].name_}`);
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });

    if (q === 12) {
      break;
    }
  }
}

exports.getandrapradesh = get;
