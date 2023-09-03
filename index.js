const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const app = express();
const api = require("./apis");
const fs = require('fs');

const file = fs.readFileSync('./4E75AAD80F6FB58EF455E7F540B258DF.txt');

mongoose
  .connect(process.env.DB_CONNECT)
  .then((success) => {
    console.log("MongoDB Connected!!!", process.env.DB_CONNECT);
  })
  .catch((err) => {
    console.log("MongoDB failed!!!", err);
  });

app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(fileupload({
  useTempFiles: true
}));

app.get("*.*", express.static(__dirname + "/ui/build"));

api(app);
app.get("*.*", express.static(__dirname + "/ui/build"));
app.all("/.well-known/pki-validation/4E75AAD80F6FB58EF455E7F540B258DF.txt", (req, res) => {
  res.sendFile(`/home/ec2-user@ip-172-31-6-227/insta-clone-app/4E75AAD80F6FB58EF455E7F540B258DF.txt`);
});

const port = process.env.PORT || 3001;

app.listen(port, function (err) {
  if (err) {
    console.log("error in server setup");
  } else {
    console.log("server listening on port", port);
  }
});
