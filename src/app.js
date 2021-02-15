const express = require("express");
const Subscriber = require("./models/subscribers");
const app = express();

// Your code goes here
app.get("/subscribers", async (req, res) => {
  const result = await Subscriber.find();
  res.send(result);
});

app.get("/subscribers/names", async (req, res) => {
  const result = await Subscriber.find().select({
    name: 1,
    subscribedChannel: 1,
    _id: 0
  });
  res.send(result);
});

app.get("/subscribers/:id", async (req, res) => {
  try {
    const result = await Subscriber.findById(req.params.id);
    res.send(result);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = app;
