const express = require("express");
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());

try{
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}catch(error){
  console.log(error)
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
    res.json({ status: "error",message:"content not found" });
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

// let PORT = 7766
let PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening${PORT}`));
