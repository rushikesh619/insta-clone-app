const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  fullname:{
    type: String,
    required:true
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 5 
  },
},
{
  timestamps: true,
}
);

user.pre('save', function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
      if (err) {
          return next(err);
      }
      this.password = passwordHash;
      next();
  });
});

module.exports = User = mongoose.model("user", user);
