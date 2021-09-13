const express = require("express");
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const getdata = require("./data_center.js");

// const haryana = require("./cheerios/haryana.js");
// const allahabad = require("./cheerios/allahabad.js");
// const ranchi = require("./cheerios/ranchi.js");
// const rajasthan = require("./cheerios/rajasthan.js");
// const uttarpradesh = require("./cheerios/uttarpradesh.js");
// const andrapradesh = require("./cheerios/andra.js");
// const Goa = require("./cheerios/Goa.js");
// const pune = require("./cheerios/pune.js");
// const Navi = require("./cheerios/Navimumbai.js");
// const madhya = require("./cheerios/madhya");
// const Puducherry = require("./cheerios/Puducherry.js");

// const uttrakhand = require("./puppeteer/uttrakhand.js");
// const kerala = require("./puppeteer/kerala.js");
// const delhi = require("./puppeteer/delhi.js");
// const westbengal = require("./puppeteer/westbengal.js");
// const chattisgarh = require("./puppeteer/chattisgarh.js");

// const maharastrafinal = require("./jsonFiles/Coordinates/MergeCoordinates/Maharastrafinal.js");
// const uttarfinal = require("./jsonFiles/Coordinates/MergeCoordinates/uttarpradeshfinal.js");
// const gujratfinal = require("./jsonFiles/Coordinates/MergeCoordinates/Gujratfinal.js");
// const dehifinal = require("./jsonFiles/Coordinates/MergeCoordinates/delhifinal.js");
// const goafinal = require("./jsonFiles/Coordinates/MergeCoordinates/goafinal.js");
// const Puducherryfinal = require("./jsonFiles/Coordinates/MergeCoordinates/puducherryfinal.js");
// const jharkhandfinal = require("./jsonFiles/Coordinates/MergeCoordinates/jharkhandfinal.js");
// const uttarakhandfinal = require("./jsonFiles/Coordinates/MergeCoordinates/uttrakhandfinal.js");
// const madhyapradeshfinal = require("./jsonFiles/Coordinates/MergeCoordinates/madhyapradeshfinal.js");
// const andhrafinal = require("./jsonFiles/Coordinates/MergeCoordinates/andhrapradeshfinal.js");
// const haryanafinal = require("./jsonFiles/Coordinates/MergeCoordinates/haryanafinal.js");
// const westbengalfinal = require("./jsonFiles/Coordinates/MergeCoordinates/westbengalfinal.js");
// const rajasthanfinal = require("./jsonFiles/Coordinates/MergeCoordinates/rajasthanfinal.js");
// const chhattisgarhfinal = require("./jsonFiles/Coordinates/MergeCoordinates/chhattisgarhfinal.js");

// setInterval(() => {
//   andrapradesh.getandrapradesh();
//   allahabad.getAllahabad();
//   ranchi.getranchi();
//   rajasthan.getrajasthan();
//   uttarpradesh.getuttarpradesh();
//   Goa.getgoa();
//   madhya.getmadhyapradesh();
//   haryana.getharyana();
//   Puducherry.getpuducherry();
//   Navi.getnavi();
//   pune.getpune();
// }, 43200000);

// setInterval(() => {
//   merge_Maharashtra.mergemaharashtra();
// }, 43740000);

// setInterval(() => {
//   maharastrafinal.maharashtrafinal();
//   goafinal.goafinal();
//   Puducherryfinal.puducherryfinal();
//   jharkhandfinal.mergejharkhand();
//   uttarfinal.uttarfinal();
//   gujratfinal.gujratfinal();
//   uttarakhandfinal.uttarakhandfinal();
//   dehifinal.delhifinal();
//   madhyapradeshfinal.madhyafinal();
//   haryanafinal.haryanafinal();
//   westbengalfinal.bengalfinal();
//   rajasthanfinal.rajasthanfinal();
//   chhattisgarhfinal.chattisfinal();
//   andhrafinal.andhrafinal();
// }, 45720000);

// setInterval(() => {
//   westbengal.getwestbengal();
//   uttrakhand.getuttrakhand();
//   kerala.getKerala();
//   delhi.getdelhi();
//   chattisgarh.getchattisgarh();
// }, 44280000);

getdata.getAllData();

const app = express();
app.use(cors());

try {
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (error) {
  console.log(error);
}

const covinetViewCount = mongoose.model(
  "covinetViewCount",
  new mongoose.Schema({
    views: Number,
  })
);

const apiViewCount = mongoose.model(
  "apiViewCount",
  new mongoose.Schema({
    views: Number,
  })
);

// const newData = {
//   views: 0,
// };

// const add = async () => {
//   await new covinetViewCount(newData).save();
// };

// add();

// final changes till version 1

app.get("/covinetViewCount_", async (req, res) => {
  const count = await covinetViewCount.findOne({});

  count.views += 1;
  await count.save();

  if (count) {
    res.send("ok");
  }
});

app.get("/apiViewCount_", async (req, res) => {
  const count = await apiViewCount.findOne({});

  count.views += 1;
  await count.save();

  if (count) {
    res.send("ok");
  }
});

app.get("/api_covinet", (req, res) => {
  const place = req.query.placename;
  if (!fs.existsSync(`./jsonFiles/${place}.json`)) {
    res.json({ status: "error", message: "content not found" });
  } else {
    try {
      fs.readFile(`./jsonFiles/${place}.json`, "utf-8", (error, data) => {
        res.send(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// let PORT = 7765;
let PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening${PORT}`));
