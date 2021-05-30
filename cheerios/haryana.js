const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

var district = [];

var url_ = [
  {
    url: "https://coronaharyana.in/?city=1",
    name: "ambala",
  },
  {
    url: "https://coronaharyana.in/?city=2",
    name: "bhiwani",
  },
  {
    url: "https://coronaharyana.in/?city=24",
    name: "chandigarh",
  },
  //   {
  //     url: "https://coronaharyana.in/?city=3",
  //     name: "charkidadri",
  //   },
  {
    url: "https://coronaharyana.in/?city=4",
    name: "faridabad",
  },
  {
    url: "https://coronaharyana.in/?city=5",
    name: "fatehabad",
  },
  {
    url: "https://coronaharyana.in/?city=6",
    name: "gurugram",
  },
  {
    url: "https://coronaharyana.in/?city=7",
    name: "hisar",
  },
  //   {
  //     url: "https://coronaharyana.in/?city=8",
  //     name: "jhajjar",
  //   },
  {
    url: "https://coronaharyana.in/?city=9",
    name: "jind",
  },
  //   {
  //     url: "https://coronaharyana.in/?city=10",
  //     name: "kaithal",
  //   },
  {
    url: "https://coronaharyana.in/?city=11",
    name: "karnal",
  },
  //   {
  //     url: "https://coronaharyana.in/?city=12",
  //     name: "kurukshetra",
  //   },
  {
    url: "https://coronaharyana.in/?city=13",
    name: "mahendragarh",
  },
  //   {
  //     url: "https://coronaharyana.in/?city=23",
  //     name: "nuh",
  //   },
  {
    url: "https://coronaharyana.in/?city=15",
    name: "palwal",
  },
  //   {
  //     url: "https://coronaharyana.in/?city=16",
  //     name: "panchkula",
  //   },
  {
    url: "https://coronaharyana.in/?city=17",
    name: "panipat",
  },
  {
    url: "https://coronaharyana.in/?city=18",
    name: "rewari",
  },
  {
    url: "https://coronaharyana.in/?city=19",
    name: "rohtak",
  },
  {
    url: "https://coronaharyana.in/?city=20",
    name: "sirsa",
  },
  {
    url: "https://coronaharyana.in/?city=21",
    name: "sonipat",
  },
  {
    url: "https://coronaharyana.in/?city=22",
    name: "yamunanagar",
  },
];

async function get() {
  for (var q = 0; q < url_.length; q++) {
    var hospital = [];
    var BED_NA = [];
    var BED_OA = [];
    var BED_OO = [];
    var BED_NO = [];
    var DATE = [];
    var TIME = [];
    var PHONE = [];
    const single_district = [];
    await axios
      .get(url_[q].url)
      .then((res) => {
        const $ = cheerio.load(res.data);
        $(`#containner0-tab > div > div.post-content > div > div > h6`).each(
          (index, element) => {
            hospital.push($(element).text().trim().split(":")[1]);
          }
        );

        $(
          `#containner0-tab > div > div.post-content > div > p > a:nth-child(2)`
        ).each((index, element) => {
          BED_OA.push($(element).text().trim());
        });

        $(
          `#containner0-tab > div:nth-child(11) > div.post-content > div > p > a.redTxt`
        ).each((index, element) => {
          BED_NA.push($(element).text().trim());
        });

        $(
          `#containner0-tab > div > div.post-content > div > div:nth-child(3)`
        ).each((index, element) => {
          BED_OO.push($(element).text().trim().split(":")[2].split(",")[0]);
        });

        $(
          `#containner0-tab > div > div.post-content > div > div:nth-child(3)`
        ).each((index, element) => {
          BED_NO.push($(element).text().trim().split(":")[3].split(",")[0]);
        });

        $(
          `#containner0-tab > div > div.post-meta-wrapper > ul > li:nth-child(1)`
        ).each((index, element) => {
          DATE.push($(element).text().trim().split("On:")[1]);
        });

        $(
          `#containner0-tab > div > div.post-meta-wrapper > ul > li:nth-child(1)`
        ).each((index, element) => {
          TIME.push(
            $(element).text().trim().split("On:")[1].split("M")[0] + "M"
          );
        });

        $(
          `#containner0-tab > div > div.post-content > div > div > span > a`
        ).each((index, element) => {
          PHONE.push($(element).text().trim());
        });

        for (var i = 0; i < hospital.length; i++) {
          var objData = {
            state: "Haryana",
            district: url_[q].name,
            hospitalName: hospital[i],
            hospitalAddress: "Not Available",
            phoneNo: PHONE[i],
            oxygenBedTotal: parseInt(BED_OO[i]) + parseInt(BED_OA[i]),
            oxygenBedOccupied: BED_OO[i],
            oxygenBedAvailable: BED_OA[i],
            normalBedTotal: parseInt(BED_NO[i]) + parseInt(BED_NA[i]),
            normalBedOccupied: BED_NO[i],
            normalBedAvailable: BED_NA[i],
            lastUpdatedDate: DATE[i],
            lastUpdatedTime: TIME[i],
          };

          var replacedString = objData.hospitalName.replace(" ", "+");
          var finalRepString = replacedString + "+" + url_[q].name;
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
          `jsonFiles/haryana.json`,
          JSON.stringify(district, null, 2),
          (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log(`File written ${url_[q].name}`);
            }
          }
        );

        fs.writeFile(
          `jsonFiles/${url_[q].name}.json`,
          JSON.stringify(single_district, null, 2),
          (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log(`File written ${url_[q].name}`);
            }
          }
        );
      })

      .catch((error) => {
        console.log(error);
      });

    if (q === 16) {
      break;
    }
  }
}

exports.getharyana = get;
