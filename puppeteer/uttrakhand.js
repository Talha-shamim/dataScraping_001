const puppeteer = require("puppeteer");
const fs = require("fs");

var uttrakhand = [];
var HOSPITAL = [];
var DISTRICT = [];
var BED_NA = [];
var BED_OA = [];
var BED_OT = [];
var BED_NT = [];
var DATE = [];
var TIME = [];
var PHONE = [];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto("https://covid19.uk.gov.in/bedssummary.aspx", {
    waitUntil: "networkidle2",
  });

  page.waitFor(3000);

  DISTRICT = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("#grdhospitalbeds > tbody > tr > td.sorting_1")
    ).map((datas) => datas.innerText)
  );

  HOSPITAL = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#lblhospitalName")).map(
      (datas) => datas.innerText
    )
  );

  PHONE = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#lblnodalofficerContactNumber")).map(
      (datas) => datas.innerText
    )
  );

  BED_NA = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#Lbloccupiedgenralbeds")).map(
      (datas) => datas.innerText
    )
  );

  BED_NT = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#lbltotGenralbeds")).map(
      (datas) => datas.innerText
    )
  );

  BED_OA = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#lbloccupiedoxygenbeds")).map(
      (datas) => datas.innerText
    )
  );

  BED_OT = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#lbltotoxygenbeds")).map(
      (datas) => datas.innerText
    )
  );

  DATE = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#lbllastupdated")).map(
      (datas) => datas.innerText.split(" ")[0]
    )
  );

  TIME = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#lbllastupdated")).map(
      (datas) => datas.innerText.split(" ")[1]
    )
  );

  for (var i = 0; i < HOSPITAL.length; i++) {
    var objData = {
      district: DISTRICT[i],
      state: "Uttrakhand",
      HospitalName: HOSPITAL[i],
      HospitalAddress: "NA",
      phoneNo: PHONE[i],
      oxygenBedTotal: BED_OT[i],
      oxygenBedAvailable: BED_OA[i],
      oxygenBedOccupied: BED_OT[i] - BED_OA[i],
      normalBedTotal: BED_NT[i],
      normalBedAvailable: BED_NA[i],
      normalBedOccupied: BED_NT[i] - BED_NA[i],
      lastUpdatedDate: DATE[i],
      lastUpdatedTime: TIME[i],
    };

    // var replacedString = objData.hospitalName.replace(" ", "+");
    // var finalRepString = replacedString + "+" + objData.district;
    // var gStringpt1 = "https://www.google.com/search?q=";
    // var gStringpt3 = "&rlz=1C1CHBF_enIN859IN859&oq=";
    // var gStringpt5 =
    //   "&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8";
    // var finalString =
    //   gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5;

    // objData.googleSearch = finalString;

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
  await browser.close();
}

exports.getuttrakhand = capture;
