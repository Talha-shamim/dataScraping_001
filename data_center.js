const allahabad = require("./cheerios/allahabad.js");
const ranchi = require("./cheerios/ranchi.js");
const uttrakhand = require("./cheerios/uttrakhand.js");
const rajasthan = require("./cheerios/rajasthan.js");
const uttarpradesh = require("./cheerios/uttarpradesh.js");
// const kerala = require("./puppeteer/kerala.js");
// const delhi = require("./puppeteer/delhi.js");
// const chattisgarh = require("./puppeteer/chattisgarh.js");

setTimeout(() => {
  allahabad.getAllahabad();
}, 10000);

setTimeout(() => {
  uttarpradesh.getuttarpradesh();
}, 40000);

setTimeout(() => {
  rajasthan.getrajasthan();
}, 20000);

setTimeout(() => {
  uttrakhand.getuttrakhand();
}, 50000);

setTimeout(() => {
  ranchi.getranchi();
}, 60000);

// kerala.getKerala();
// delhi.getdelhi();
// chattisgarh.getchattisgarh();
