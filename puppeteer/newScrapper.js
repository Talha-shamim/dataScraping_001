const puppeteer = require("puppeteer");
const fs = require("fs");
let browser = puppeteer.Browser;
process.setMaxListeners(Infinity);
const main = async (links,page,destination) => {
    try{
const alllink = links
var newarray = []
console.log(alllink.length)
for (let [i,link] of alllink.entries() ){
      const data = await gatherdata(link,page);
      if (data.location.length) {
        data["url"] = link;
        newarray.push(data)
       
        fs.writeFile(
            destination,
            JSON.stringify(newarray, null, 2),
            (error) => {
              if (error) {
                console.log(error);
              } else console.log(`File written mp cord`);
            }
          );
      }
      console.log(i)
    
    }


    }

    catch(err){
        console.log('err',err)
    }
};

const gatherdata = async (url,page) => {
  try {
    await url;
    await page
    await page.setDefaultNavigationTimeout(0);
    // process.setMaxListeners(0)
    await page.goto(url) , { waitUntil: 'domcontentloaded' };

    const data = await page.evaluate(() => {
      var address = "";
      var phonecall = "";
      var lattitude = "";
      var longitude = "";

      let adbool = document.querySelector("span.LrzXr");
      if (adbool) {
        address = adbool.innerText;
      }
      let phonebool = document.querySelector('a[data-dtype="d3ifr"]');
      if (phonebool) {
        phonecall = phonebool.innerText;
      }

      let coord = document.querySelector(".rhsmap4col > a");
      if (coord) {
        var target = coord.getAttribute("data-url");
        var indexofa = target.indexOf("@");
        var indexof1stcomma = target.indexOf(",", indexofa);
        var indexof2ndcomma = target.indexOf(",", indexof1stcomma + 2);
        lattitude = target.substring(indexofa + 1, indexof1stcomma);
        longitude = target.substring(indexof1stcomma + 1, indexof2ndcomma);
      }

      let item = {
        location: address,
        phone: phonecall,
        url: "",
        cordlat: lattitude,
        cordlon: longitude,
      };

      return item;
    });

    return data;
  } 
  
  catch (err) {
    console.log("err in google scrapper", err);
  }
};

exports.newgoogle = main;
