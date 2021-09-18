const User = require("../modals/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (doc) => {
  try {
    let existingUser = await User.find({
      username: doc.username,
    });
    console.log(existingUser);
    if (existingUser.length === 0) {
      let user = new User({
        email: doc.email,
        fullname: doc.name,
        username: doc.username,
        password: doc.password,
      });
      console.log(user);
      user = await user.save();
      console.log(user);
      return user;
    } else {
      throw {
        message: "User already exists!",
      };
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const login = async (doc) => {
  const user = await User.findOne({ username: doc.username });
  if (!user) {
    throw {
      message: "No account with this email has been registered.",
    };
  }
  const isMatch = await bcrypt.compare(doc.password, user.password);
  if (!isMatch) {
    throw {
      message: "Invalid credentials.",
    };
  }
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  return { token: token, user: user };
};

module.exports = {
  createUser,
  login,
};
