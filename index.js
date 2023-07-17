const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const app = express();
const api = require("./apis");

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

app.get("*.*", express.static("https://rushikesh-insta-clone-app.s3.ap-south-1.amazonaws.com/build"));

api(app);

app.all("*", function (req, res) {
  res.status(200).sendFile(`/`, { root: "https://rushikesh-insta-clone-app.s3.ap-south-1.amazonaws.com/build" });
});

const port = process.env.PORT || 3001;

app.listen(port, function (err) {
  if (err) {
    console.log("error in server setup");
  } else {
    console.log("server listening on port", port);
  }
});
