const puppeteer = require("puppeteer");
const fs = require("fs");

const delhi = [];

async function get() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto(
    "https://dshm.delhi.gov.in/mis/(S(pxfvnxkcgd5xgrl5wbfaus4i))/Private/frmFreeBedMonitoringReport.aspx",
    { waitUntil: "networkidle2" }
  );

  const data = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        "#ctl00_ContentPlaceHolder1_grvHospital > tbody > tr > td"
      )
    ).map((atas) => atas.innerText)
  );

  m = 0;
  k = 1;
  a = 3;
  c = 6;
  x = 4;
  y = 7;
  o = 11;
  for (var i = 0; o < data.length; i++) {
    var objData = {
      state: "delhi",
      district: "delhi",
      hospitalName: data[k].split(",")[0],
      hospitalAddress: data[k].split(",")[1],
      normalBedTotal: data[a],
      normalBedOccupied: data[a] - data[c],
      normalBedAvailable: data[c],
      oxygenBedTotal: data[x],
      oxygenBedOccupied: data[x] - data[y],
      oxygenBedAvailable: data[y],
      phoneNo: data[o],
      lastUpdatedDate: "NA",
      lastUpdatedTime: "NA",
    };

    var replacedString = objData.hospitalName.replace(" ", "+");
    var finalRepString = replacedString + "+" + objData.district;
    var gStringpt1 = "https://www.google.com/search?q=";
    var gStringpt3 = "&rlz=1C1CHBF_enIN859IN859&oq=";
    var gStringpt5 =
      "&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8";
    var finalString =
      gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5;

    objData.googleSearch = finalString;

    m += 13;
    k += 13;
    a += 13;
    c += 13;
    x += 13;
    y += 13;
    o += 13;
    delhi.push(objData);
  }

  fs.writeFile(
    "jsonFiles/delhi.json",
    JSON.stringify(delhi, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("File written delhi");
    }
  );

  await page.waitFor(10000);

  await browser.close();
}

exports.getdelhi = get;
