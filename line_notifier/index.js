const config = require('config');
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const line = require('@line/bot-sdk');

const app = express();

const client = new line.Client({
  channelAccessToken: config.bot.channelAccessToken
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * POST /
 * body { "soilmoisture": value }
 */
app.post("/", function(req, res) {
  res.header("Content-Type", "application/json; charset=utf-8");

  const moisture = req.body.soilmoisture;
  console.log("soilmoisture : " + moisture);
  if (moisture == null) {
    res.status(415);
    res.send({ "status": "error", "detail": "moisture must not be null" });
    return;
  }

  const message = {
    "type": "text",
    "text": moisture
  };

  client.pushMessage(config.dest.userId, message)
  .then(() => {
    res.send({ "status": "success" });
    console.log("success : moisture = " + moisture);
  })
  .catch((err) => {
    res.status(500);
    res.send({ "status": "error", "detail": err });
    console.log(err);
  });
});

http.createServer(app).listen(config.server.port, config.server.host);
console.log("listening on " + config.server.host + ":" + config.server.port);

