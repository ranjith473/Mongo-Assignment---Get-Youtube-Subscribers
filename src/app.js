const express = require("express");
const subscriberModel = require("./models/subscribers");
const app = express();
const data = require("./data");
const mongoose = require("mongoose");

// Your code goes here
app.get("/subscribers", async (req, res) => {
   res.send(await subscriberModel.find());
  
});

app.get("/subscribers/names", async (req, res) => {
  const projectedresult = await subscriberModel.find().select({
    name: true,
    subscribedChannel: true,
    _id: false
  });
  res.send(projectedresult);
});

app.get("/subscribers/:id", async (req, res) => {
  const idToSearch = req.params.id;
  try {
    const doc = await subscriberModel.findOne({ _id: idToSearch});
    if(doc== null) {
      res.status(400).send({ message: "Id not found"});
    } else {
      res.send(doc);
    }
  } catch (err) {
     res.status(400).send({ message: err.message });
  }
});

module.exports = app;
