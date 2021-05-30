const madhya = require('../chhattisgarh.json')
const puppeteer = require("puppeteer");
const newgoogle = require('../../puppeteer/newScrapper.js')
var links = []
madhya.map(dt => links.push(dt.googleSearch))

getdata = async () => {
    const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();
    newgoogle.newgoogle(links,page,'jsonFiles/Coordinates/chhattisgarhcoordinates.json')
}

getdata()