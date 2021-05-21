const allahabad = require("./cheerios/allahabad.js");
const ranchi = require("./cheerios/ranchi.js");
const uttrakhand = require("./cheerios/uttrakhand.js");
const rajasthan = require("./cheerios/rajasthan.js");
const uttarpradesh = require("./cheerios/uttarpradesh.js");
const kerala = require("./puppeteer/kerala.js");
const delhi = require("./puppeteer/delhi.js");
const chattisgarh = require("./puppeteer/chattisgarh.js");

setTimeout(() => {
  allahabad.getAllahabad();
  uttarpradesh.getuttarpradesh();
  uttrakhand.getuttrakhand();
  rajasthan.getrajasthan();
  ranchi.getranchi();
  kerala.getKerala();
  delhi.getdelhi();
  chattisgarh.getchattisgarh();
}, 10000);
