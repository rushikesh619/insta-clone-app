const mongoose = require("mongoose");

const posts = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    caption: {
      type: String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    username:{
        type:String
    },
    likes:[
      String
    ],
    comments: [
      String
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = Posts = mongoose.model("posts", posts);
