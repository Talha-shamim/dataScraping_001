const haryana = require("./cheerios/haryana.js");
const allahabad = require("./cheerios/allahabad.js");
const ranchi = require("./cheerios/ranchi.js");
const rajasthan = require("./cheerios/rajasthan.js");
const uttarpradesh = require("./cheerios/uttarpradesh.js");
const andrapradesh = require("./cheerios/andra.js");
const Goa = require("./cheerios/Goa.js");
const pune = require("./cheerios/pune.js");
const Navi = require("./cheerios/Navimumbai.js");
const madhya = require("./cheerios/madhya");

const Puducherry = require("./cheerios/Puducherry.js");
const Ahmedabad = require("./puppeteer/Ahmedabad.js");
const uttrakhand = require("./puppeteer/uttrakhand.js");
const kerala = require("./puppeteer/kerala.js");
const delhi = require("./puppeteer/delhi.js");
const westbengal = require("./puppeteer/westbengal.js");
const chattisgarh = require("./puppeteer/chattisgarh.js");

const mergeMaharashtra = require("./jsonFiles/MergeJson/maharashtra.js");

// const Goacoordmaker = require("./jsonFiles/Coordmaker/Goacoordmaker.js");
// const jharkhandcoordmaker = require("./jsonFiles/Coordmaker/Jharkhandcoordmaker.js");
// const madhyacoordmaker = require("./jsonFiles/Coordmaker/Madhyacoordmaker.js"); // NOT DONE
// const maharastracoordmaker = require("./jsonFiles/Coordmaker/Maharastracoordmaker.js");
// const uttarcoordmaker = require("./jsonFiles/Coordmaker/uttarcoordmaker.js");
// const puducherrycoordmaker = require("./jsonFiles/Coordmaker/puducherrycoordmaker.js");
// const delhicoordmaker = require("./jsonFiles/Coordmaker/delhicoordmaker.js");
// const ahmedabadcoordmaker = require("./jsonFiles/Coordmaker/ahmedabadcoordmaker.js");
// // const keralacoordmaker = require('./jsonFiles/Coordmaker/keralacoordmaker') not working
// // const chhattisgarhcoordmaker = require('./jsonFiles/Coordmaker/chhattisgarhcoordmaker') not working
// const uttrakhandcoordmaker = require("./jsonFiles/Coordmaker/uttrakhandcoordmaker.js");
// const maharastrafinal = require("./jsonFiles/Coordinates/MergeCoordinates/Maharastra");
// const uttarfinal = require("./jsonFiles/Coordinates/MergeCoordinates/uttarpradeshfinal");

setInterval(() => {
  andrapradesh.getandrapradesh();
  allahabad.getAllahabad();
  ranchi.getranchi();
  Goa.getgoa();
  Navi.getnavi();
  madhya.getmadhyapradesh();
  haryana.getharyana();
  Puducherry.getpuducherry();
  uttarpradesh.getuttarpradesh();
  pune.getpune();
  rajasthan.getrajasthan();
}, 21600000);

setInterval(() => {
  westbengal.getwestbengal();
  uttrakhand.getuttrakhand();
  Ahmedabad.getahmadabad();
  kerala.getKerala();
  delhi.getdelhi();
  chattisgarh.getchattisgarh();
}, 25200000);

setInterval(() => {
  mergeMaharashtra;
}, 28800000);

// uttarcoordmaker;
// Goacoordmaker;
// jharkhandcoordmaker;
// maharastracoordmaker;
// puducherrycoordmaker;
// delhicoordmaker;
// ahmedabadcoordmaker;
// keralacoordmaker;
// uttrakhandcoordmaker;
// madhyacoordmaker;

// setInterval(() => {
//   maharastrafinal;
// }, 10);
