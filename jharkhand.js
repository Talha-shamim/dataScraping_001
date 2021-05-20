const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const data = [];
const jharkhand = [];

async function get() {
  await axios
    .get("https://www.jharkhand.gov.in/Home/CovidDistrict")
    .then((res) => {
      // initialize cheerios
      const $ = cheerio.load(res.data);
      // get the id for the selector and push it to the data array
      $(`#dialog > table > tbody > tr > td`).each((index, element) => {
        data.push($(element).text().trim());
      });

      // use the data array and make the object
      // first do console.log(data) to get the initial values of the districts, hospital name and other attributes

      k = 2;
      l = 6;
      m = 3;
      x = 4;
      y = 5;
      for (var i = 0; i < 24; i++) {
        // make the object
        var objData = {
          district: data[k],
          deaths: data[l],
          totalCases: data[m],
          activeCases: data[x],
          recovered: data[y],
        };
        // push to the array of state
        jharkhand.push(objData);

        k += 6;
        l += 6;
        m += 6;
        x += 6;
        y += 6;
      }

      fs.writeFile(
        "./jsonFiles/jharkhand.json",
        JSON.stringify(jharkhand, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log("File written Jharkhand");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.getjharkhand = get;
