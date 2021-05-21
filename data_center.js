const allahabad = require("./cheerios/allahabad.js");
const ranchi = require("./cheerios/ranchi.js");
const uttrakhand = require("./cheerios/uttrakhand.js");
const rajasthan = require("./cheerios/rajasthan.js");
const uttarpradesh = require("./cheerios/uttarpradesh.js");
const Goa = require('./cheerios/Goa.js');
const Puducherry = require('./cheerios/Puducherry.js');
const Navi = require('./cheerios/Navimumbai.js');
const Ahmedabad = require('./puppeteer/Ahmedabad.js');
const Haryana  = require('./puppeteer/Haryana.js');
const Madhya = require('./puppeteer/Madhyapradesh');
const kerala = require("./puppeteer/kerala.js");
const delhi = require("./puppeteer/delhi.js");
const chattisgarh = require("./puppeteer/chattisgarh.js");

setTimeout(() => {
   allahabad.getAllahabad();
   uttarpradesh.getuttarpradesh();
   uttrakhand.getuttrakhand();
   rajasthan.getrajasthan();
  ranchi.getranchi();
  Goa.getgoa();
  Puducherry.getpuducherry();
  Navi.getnavi();
  Ahmedabad.getahmadabad();
  Haryana.getharyana();
  Madhya.getmadhyapradesh();
  kerala.getKerala();
  delhi.getdelhi();
  chattisgarh.getchattisgarh();
}, 10000);



