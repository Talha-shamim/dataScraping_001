const puppeteer = require("puppeteer");
const fs = require("fs");

var data;
var chattisgarh = [];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto("https://cg.nic.in/health/covid19/RTPBedAvailable.aspx", {
    waitUntil: "networkidle2",
  });

  await page.waitForTimeout(10000);
  await page.click("#ctl00_ContentPlaceHolder1_Button1");

  await page.waitForTimeout(10000);

  data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("td")).map((atas) =>
      atas.innerText.trim()
    )
  );

  m = 5;
  n = 6;
  o = 7;
  a = 10;
  b = 11;
  x = 12;
  y = 13;
  d = 24;
  for (t = 25; t < data.length; t += 22) {
    var objData = {
      district: data[m],
      state: "Chattisgarh",
      hospitalName: data[n],
      hospitalAddress: "Not Available",
      phoneNo: data[o].split(/(\d+)/)[1],
      oxygenBedTotal: data[a],
      oxygenBedAvailable: data[b],
      oxygenBedOccupied: data[a] - data[b],
      normalBedTotal: data[x],
      normalBedAvailable: data[y],
      normalBedOccupied: data[x] - data[y],
      lastUpdatedDate: data[d],
      lastUpdatedTime: data[t],
    };

    var replacedString = objData.hospitalName.replace(" ", "+");
    var finalRepString = replacedString + "+" + "chattisgarh";
    var gStringpt1 = "https://www.google.com/search?q=";
    var gStringpt3 = "&rlz=1C1CHBF_enIN859IN859&oq=";
    var gStringpt5 =
      "&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8";
    var finalString =
      gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5;

    objData.googleSearch = finalString;

    m += 22;
    n += 22;
    o += 22;
    a += 22;
    b += 22;
    x += 22;
    y += 22;
    d += 22;
    chattisgarh.push(objData);
  }
  fs.writeFile(
    "jsonFiles/chhattisgarh.json",
    JSON.stringify(chattisgarh, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("File written chattisgarh");
    }
  );
  await browser.close();
}


exports.getchattisgarh = capture;
