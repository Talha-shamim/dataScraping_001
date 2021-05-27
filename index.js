const express = require("express");
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const Count = mongoose.model(
  "Count",
  new mongoose.Schema({
    views: Number,
  })
);

app.get("/countOne", async (req, res) => {
  const count = await Count.findOne({});

  console.log(count);

  count.views += 1;
  await count.save();

  if (count) {
    res.send("ok");
  }
});

app.get("/api_covinet", (req, res) => {
  const place = req.query.placename;
  if (!fs.existsSync(`./jsonFiles/${place}.json`)) {
    res.json({ status: "Error : Place Not Found" });
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

app.listen(process.env.PORT || 3001, () => console.log(`listening`));
