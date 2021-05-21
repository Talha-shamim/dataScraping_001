const fs = require("fs");
var Ambala = require("../Ambala.json");
var Bhiwani = require("../Bhiwani.json");
var CharkiDadri = require("../Charki Dadri.json");
var Fatehabad = require("../Fatehabad.json");
var Gurugram = require("../Gurugram.json");
var Hisar = require("../Hisar.json");
var Jhajjar = require("../Jhajjar.json");
var Jind = require("../Jind.json");
var Kaithal = require("../Kaithal.json");
var Karnal = require("../Karnal.json");
var Kurukshetra = require("../Kurukshetra.json");
var Mahendragarh = require("../Mahendragarh.json");
var Nuh = require("../Nuh.json");
var Palwal = require("../Palwal.json");
var Panchkula = require("../Panchkula.json");
var Panipat = require("../Panipat.json");
var Rewari = require("../Rewari.json");
var Rohtak = require("../Rohtak.json");
var Sirsa = require("../Sirsa.json");
var Sonipat = require("../Sonipat.json");
var Yamunanagar = require("../Yamunanagar.json");

const merge = () => {
  var Haryana = [];
  var news = Haryana.concat(Ambala);
  var it = news.concat(Bhiwani);
  var it1 = it.concat(CharkiDadri);
  var it2 = it1.concat(Fatehabad);
  var it3 = it2.concat(Gurugram);
  var it4 = it3.concat(Hisar);
  var it5 = it4.concat(Jhajjar);
  var it6 = it5.concat(Jind);
  var it7 = it6.concat(Kaithal);
  var it8 = it7.concat(Karnal);
  var it9 = it8.concat(Kurukshetra);
  var it10 = it9.concat(Mahendragarh);
  var it11 = it10.concat(Nuh);
  var it12 = it11.concat(Palwal);
  var it13 = it12.concat(Panchkula);
  var it14 = it13.concat(Panipat);
  var it15 = it14.concat(Rewari);
  var it16 = it15.concat(Rohtak);
  var it17 = it16.concat(Sirsa);
  var it18 = it17.concat(Sonipat);
  var it19 = it18.concat(Yamunanagar);
  fs.writeFile(`../Haryana.json`, JSON.stringify(it19, null, 2), (error) => {
    if (error) {
      console.log(error);
    } else console.log(`File written Merge Haryana`);
  });
  return Haryana;
};

merge();
