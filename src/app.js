const express = require("express");
const SubscriberModel = require("./models/subscribers");
const app = express();

// Your code goes here
app.get("/subscribers", async (req, res) => {
  const result = await SubscriberModel.find();
  res.send(result);
});

app.get("/subscribers/names", async (req, res) => {
  const projectedresult = await SubscriberModel.find().select({
    name: true,
    subscribedChannel: true,
    _id: false
  });
  res.send(projectedresult);
});

app.get("/subscribers/:id", async (req, res) => {
  const idToSearch = req.params.id;
  try {
    const doc = await SubscriberModel.findOne({ _id: idToSearch});
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
