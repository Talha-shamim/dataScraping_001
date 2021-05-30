const puppeteer = require("puppeteer");
const fs = require("fs");

var data;
var data_;
var kerala = [];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
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

  await page.waitForTimeout(5000);

  data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  await page.click("#hosTable_next");

  await page.waitForTimeout(5000);

  data1 = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  await page.waitForTimeout(5000);
  await page.click("#hosTable_next");

  data2 = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  data = data.concat(data1);
  data = data.concat(data2);

  await browser.close();
}

async function capture_() {
  const browser = await puppeteer.launch({
    headless: true,
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

  await page.waitForTimeout(5000);

  data_ = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  await page.click("#hosTable_next");

  await page.waitForTimeout(5000);

  data1_ = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#hosTable > tbody > tr > td")).map(
      (datas) => datas.innerText
    )
  );

  await page.waitForTimeout(5000);
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
      HospitalName: "Not Available",
      HospitalAddress: "Not Available",
      normalBedTotal: data_[l],
      normalBedAvailable: data_[n],
      normalBedOccupied: data_[l] - data_[n],
      lastUpdatedDate: "-",
      lastUpdatedTime: "-",
      phoneNo: "-",
      oxygenBedTotal: data[a],
      oxygenBedAvailable: data[b],
      oxygenBedOccupied: data[a] - data[b],
      rank:1
    };

    objData.googleSearch = "Not Available";

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

capture();
capture_();
exports.getKerala = main;
