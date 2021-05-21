const puppeteer = require("puppeteer");
const fs = require("fs");

var data;
var data_;
var kerala = [];

async function capture() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto(
    "https://covid19jagratha.kerala.nic.in/home/addHospitalDashBoard",
    { waitUntil: "networkidle2" }
  );

  await page.click(
    "#services > div > div:nth-child(4) > div:nth-child(3) > div > h4 > a"
  );

  await page.waitFor(5000);

  data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  await page.click("#hosTable_next");

  await page.waitFor(5000);

  data1 = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  await page.waitFor(5000);
  await page.click("#hosTable_next");

  data2 = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  data = data.concat(data1);
  data = data.concat(data2);

  m = 0;
  l = 1;
  n = 2;
  for (var i = 0; n < data.length; i++) {
    var objdata = {
      district: data[m],
      oxygenBedTotal: data[l],
      oxygenBedAvailable: data[n],
      oxygenBedOccupied: data[l] - data[n],
    };

    m += 3;
    l += 3;
    n += 3;

    kerala.push(objdata);
  }

  await browser.close();
}

capture();

async function capture_() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto(
    "https://covid19jagratha.kerala.nic.in/home/addHospitalDashBoard",
    { waitUntil: "networkidle2" }
  );

  await page.click(
    "#services > div > div:nth-child(5) > div.col-md-4.col-lg-4.oxybed > div > h6 > a"
  );

  await page.waitFor(5000);

  data_ = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  await page.click("#hosTable_next");

  await page.waitFor(5000);

  data1_ = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  await page.waitFor(5000);
  await page.click("#hosTable_next");

  data2_ = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  data_ = data_.concat(data1_);
  data_ = data_.concat(data2_);

  m = 0;
  l = 1;
  n = 2;
  a = 1;
  b = 2;
  for (var i = 0; n < data_.length; i++) {
    var objData = {
      district: data_[m],
      state: "Kerala",
      HospitalName: "NA",
      HospitalAddress: "NA",
      normalBedTotal: data_[l],
      normalBedAvailable: data_[n],
      normalBedOccupied: data_[l] - data_[n],
      lastUpdatedDate: "NA",
      lastUpdatedTime: "NA",
      phoneNo: "NA",
      oxygenBedTotal: data[a],
      oxygenBedAvailable: data[b],
      oxygenBedOccupied: data[a] - data[b],
    };

    // var replacedString = objData.hospitalName.replace(" ", "+");
    // var finalRepString = replacedString + "+" + objData.district;
    // var gStringpt1 = "https://www.google.com/search?q=";
    // var gStringpt3 = "&rlz=1C1CHBF_enIN859IN859&oq=";
    // var gStringpt5 =
    //   "&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8";
    // var finalString =
    //   gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5;

    objData.googleSearch = "NA";

    m += 3;
    l += 3;
    n += 3;
    a += 3;
    b += 3;

    kerala.push(objData);
  }

  fs.writeFile(
    "jsonFiles/kerala.json",
    JSON.stringify(kerala, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("File written Kerala");
    }
  );

  await browser.close();
}

function main() {
  capture();
  capture_();
}

exports.getKerala = main;
