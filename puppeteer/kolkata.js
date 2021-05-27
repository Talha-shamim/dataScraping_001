const puppeteer = require("puppeteer");
const fs = require("fs");

var NAMES = [
  "DAKSHIN 24 PARGANA",
  "ALIPURDUAR",
  "BANKURA",
  "BIRBHUM",
  "COOCHBEHAR",
  "DAKSHIN DINAJPUR",
  "DARJEELING",
  "HOOGHLY",
  "HOWRAH",
  "JALPAIGURI",
  "JHARGRAM",
  "KALIMPONG",
  "KOLKATA METROPOLITAN AREA",
  "MALDA",
  "MURSHIDABAD",
  "NADIA",
  "PASCHIM BARDHAMAN",
  "PASCHIM MEDINIPUR",
  "PURBA BARDHHAMAN",
  "PURBA MEDINIPUR",
  "PURULIA",
  "UTTAR 24 PARGANA",
  "UTTAR DINAJPUR",
];

var VALUES = [
  "016",
  "020",
  "001",
  "003",
  "008",
  "017",
  "004",
  "006",
  "005",
  "007",
  "022",
  "021",
  "019",
  "009",
  "012",
  "013",
  "023",
  "010",
  "002",
  "011",
  "014",
  "015",
  "018",
];

const kolkata = [];

async function get() {
  for (var q = 0; q < NAMES.length; q++) {
    var single_district = [];
    var HOSPITAL = [];
    var ADDRESS = [];
    var BED_DETAILS_TOTAL = [];
    var BED_DETAILS_AVAILABLE = [];
    var BED_NA = [];
    var BED_OA = [];
    var BED_OT = [];
    var BED_NT = [];
    var PHONE = [];

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.goto(
      "https://excise.wb.gov.in/chms/Public/Page/CHMS_Public_Hospital_Bed_Availability.aspx",
      { waitUntil: "networkidle2" }
    );

    await page.waitForTimerTimeout(10000);

    await page.select("#ctl00_ContentPlaceHolder1_ddl_District", VALUES[q]);

    await page.waitForTimerTimeout(10000);

    HOSPITAL = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.card-header > h5")).map(
        (datas) => datas.innerText
      )
    );

    ADDRESS = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "div.card-header > div > div.card-text.col-md-12.col-lg-12.col-sm-12.col-xs-12"
        )
      ).map((datas) => datas.innerText)
    );

    PHONE = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "div.card-header > div > div.card-text.col-md-6.col-lg-6.col-sm-12.col-xs-12.mb-2.mt-2"
        )
      ).map((datas) => datas.innerText)
    );

    BED_DETAILS_TOTAL = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          " #collapseExample > div > div > div > div.card-body > div > div:nth-child(4) > div > ul > li:nth-child(1) > h3"
        )
      ).map((datas) => datas.innerText.trim().split("\n")[0])
    );

    BED_DETAILS_AVAILABLE = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          " #collapseExample > div > div > div > div.card-body > div > div:nth-child(4) > div > ul > li:nth-child(2) > h3"
        )
      ).map((datas) => datas.innerText.trim().split("\n")[0])
    );

    for (var i = 0; i < BED_DETAILS_TOTAL.length; i++) {
      if (i % 5 == 0) {
        BED_NT.push(BED_DETAILS_TOTAL[i]);
      }
      if (i % 5 == 1) {
        BED_OT.push(BED_DETAILS_TOTAL[i]);
      }
    }

    for (var i = 0; i < BED_DETAILS_AVAILABLE.length; i++) {
      if (i % 5 == 0) {
        BED_NA.push(BED_DETAILS_AVAILABLE[i]);
      }
      if (i % 5 == 1) {
        BED_OA.push(BED_DETAILS_AVAILABLE[i]);
      }
    }

    for (var i = 0; i < HOSPITAL.length; i++) {
      var objData = {
        district: NAMES[q].split(" ").join("").toLowerCase(),
        state: "Westbengal",
        hospitalName: HOSPITAL[i],
        hospitalAddress: ADDRESS[i],
        phoneNo: PHONE[i].split(":")[1],
        oxygenBedTotal: BED_OT[i],
        oxygenBedAvailable: BED_OA[i],
        oxygenBedOccupied: BED_OT[i] - BED_OA[i],
        normalBedTotal: BED_NT[i],
        normalBedAvailable: BED_NA[i],
        normalBedOccupied: BED_NT[i] - BED_NA[i],
        lastUpdatedDate: "-",
        lastUpdatedTime: "-",
      };

      var replacedString = objData.hospitalName.replace(" ", "+");
      var finalRepString = replacedString + "+" + NAMES[q];
      var gStringpt1 = "https://www.google.com/search?q=";
      var gStringpt3 = "&rlz=1C1CHBF_enIN859IN859&oq=";
      var gStringpt5 =
        "&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8";
      var finalString =
        gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5;

      objData.googleSearch = finalString;

      kolkata.push(objData);
      single_district.push(objData);
    }

    fs.writeFile(
      `jsonFiles/${NAMES[q].split(" ").join("").toLowerCase()}.json`,
      JSON.stringify(single_district, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        } else
          console.log(
            `File written ${NAMES[q].split(" ").join("").toLowerCase()}`
          );
      }
    );

    await browser.close();
  }
  fs.writeFile(
    `jsonFiles/kolkata.json`,
    JSON.stringify(kolkata, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written kolkata`);
    }
  );
}

get();
exports.getkolkata = get;
