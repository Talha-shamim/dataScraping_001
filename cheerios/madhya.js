const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

var district = [];

var url_ = [
  {
    name: "AgarMalwa",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=46&facility_org_type=0&facility=0",
  },
  {
    name: "Alirajpur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=14&facility_org_type=0&facility=0",
  },
  {
    name: "Anuppur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=43&facility_org_type=0&facility=0",
  },
  {
    name: "Ashoknagar",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=10&facility_org_type=0&facility=0",
  },
  {
    name: "Balaghat",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=22&facility_org_type=0&facility=0",
  },
  {
    name: "Barwani",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=15&facility_org_type=0&facility=0",
  },
  {
    name: "Betul",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=30&facility_org_type=0&facility=0",
  },
  {
    name: "Bhind",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=8&facility_org_type=0&facility=0",
  },
  {
    name: "Bhopal",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=1&facility_org_type=0&facility=0",
  },
  {
    name: "Burhanpur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=16&facility_org_type=0&facility=0",
  },
  {
    name: "Chhatarpur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=37&facility_org_type=0&facility=0",
  },
  {
    name: "Chhindwara",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=23&facility_org_type=0&facility=0",
  },
  {
    name: "Damoh",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=38&facility_org_type=0&facility=0",
  },
  {
    name: "Datia",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=12&facility_org_type=0&facility=0",
  },
  {
    name: "Dewas",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=47&facility_org_type=0&facility=0",
  },
  {
    name: "Dhar",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=18&facility_org_type=0&facility=0",
  },
  {
    name: "Dindori",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=29&facility_org_type=0&facility=0",
  },
  {
    name: "Guna",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=13&facility_org_type=0&facility=0",
  },
  {
    name: "Gwalior",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=9&facility_org_type=0&facility=0",
  },
  {
    name: "Harda",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=31&facility_org_type=0&facility=0",
  },
  {
    name: "Hoshangabad",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=32&facility_org_type=0&facility=0",
  },
  {
    name: "Indore",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=17&facility_org_type=0&facility=0",
  },
  {
    name: "Jabalpur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=24&facility_org_type=0&facility=0",
  },
  {
    name: "Jhabua",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=19&facility_org_type=0&facility=0",
  },
  {
    name: "Katni",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=25&facility_org_type=0&facility=0",
  },
  {
    name: "Khandwa",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=20&facility_org_type=0&facility=0",
  },
  {
    name: "Khargone",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=21&facility_org_type=0&facility=0",
  },
  {
    name: "Mandla",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=26&facility_org_type=0&facility=0",
  },
  {
    name: "Mandsaur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=48&facility_org_type=0&facility=0",
  },
  {
    name: "Morena",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=6&facility_org_type=0&facility=0",
  },
  {
    name: "Narsinghpur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=27&facility_org_type=0&facility=0",
  },
  {
    name: "Neemuch",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=49&facility_org_type=0&facility=0",
  },
  {
    name: "Niwari",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=42&facility_org_type=0&facility=0",
  },
  {
    name: "Panna",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=39&facility_org_type=0&facility=0",
  },
  {
    name: "Raisen",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=2&facility_org_type=0&facility=0",
  },
  {
    name: "Rajgarh",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=3&facility_org_type=0&facility=0",
  },
  {
    name: "Ratlam",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=50&facility_org_type=0&facility=0",
  },
  {
    name: "Rewa",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=33&facility_org_type=0&facility=0",
  },
  {
    name: "Sagar",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=40&facility_org_type=0&facility=0",
  },
  {
    name: "Satna",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=34&facility_org_type=0&facility=0",
  },
  {
    name: "Sehore",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=4&facility_org_type=0&facility=0",
  },
  {
    name: "Seoni",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=28&facility_org_type=0&facility=0",
  },
  {
    name: "Shahdol",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=44&facility_org_type=0&facility=0",
  },
  {
    name: "Shajapur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=51&facility_org_type=0&facility=0",
  },
  {
    name: "Sheopur",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=7&facility_org_type=0&facility=0",
  },
  {
    name: "Shivpuri",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=11&facility_org_type=0&facility=0",
  },
  {
    name: "Sidhi",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=35&facility_org_type=0&facility=0",
  },
  {
    name: "Singrauli",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=36&facility_org_type=0&facility=0",
  },
  {
    name: "Tikamgarh",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=41&facility_org_type=0&facility=0",
  },
  {
    name: "Ujjain",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=52&facility_org_type=0&facility=0",
  },
  {
    name: "Umaria",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=45&facility_org_type=0&facility=0",
  },
  {
    name: "Vidisha",
    url: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=5&facility_org_type=0&facility=0",
  },
];

async function get() {
  for (var q = 0; q < url_.length; q++) {
    var HOSPITAL = [];
    var PHONE = [];
    var BED_OA = [];
    var TIME = [];
    var DATE = [];
    const single_district = [];
    await axios
      .get(url_[q].url)
      .then((res) => {
        const $ = cheerio.load(res.data);
        $(
          `#main > div > section.wrapper-tbl > table > tbody > tr > td:nth-child(1) > div.hospitalname`
        ).each((index, element) => {
          HOSPITAL.push($(element).text().trim().split("/")[0]);
        });

        $(`span > a`).each((index, element) => {
          if (index % 3 == 0) PHONE.push($(element).text().trim());
        });

        $(
          `#main > div > section.wrapper-tbl > table > tbody > tr > td.text-center > div.deecriptions > ul > li:nth-child(2) > label`
        ).each((index, element) => {
          BED_OA.push($(element).text().trim());
        });
        $(
          ` #main > div > section.wrapper-tbl > table > tbody > tr > td.text-center > div.last-updated > span`
        ).each((index, element) => {
          DATE.push($(element).text().trim().split(",")[0]);
          TIME.push($(element).text().trim().split(",")[1]);
        });

        for (var i = 0; i < HOSPITAL.length; i++) {
          var objData = {
            state: "Madhyapradesh",
            hospitalName: HOSPITAL[i],
            hospitalAdress: "Not Available",
            district: url_[q].name.toLowerCase(),
            phoneNo: PHONE[i],
            oxygenBedTotal: "-",
            oxygenBedOccupied: "-",
            oxygenBedAvailable: BED_OA[i],
            normalBedTotal: "-",
            normalBedOccupied: "-",
            normalBedAvailable: "-",
            lastUpdatedDate: DATE[i],
            lastUpdatedTime: TIME[i],
          };

          var replacedString = objData.hospitalName.replace(" ", "+");
          var finalRepString = replacedString + "+" + "madhyapradesh";
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
          `jsonFiles/madhyapradesh.json`,
          JSON.stringify(district, null, 2),
          (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log(`File written ${url_[q].name.toLowerCase()}`);
            }
          }
        );

        fs.writeFile(
          `jsonFiles/${url_[q].name.toLowerCase()}.json`,
          JSON.stringify(single_district, null, 2),
          (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log(q);
              console.log(`File written ${url_[q].name.toLowerCase()}`);
            }
          }
        );
      })

      .catch((error) => {
        console.log(error);
      });

    if (q == 51) break;
  }
}

get()
exports.getmadhyapradesh = get;
