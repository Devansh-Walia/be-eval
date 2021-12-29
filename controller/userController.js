"use strict";
const path = require("path");
const fs = require("fs");

// Compare this snippet from routes\router.js:
// router.get("/", home);
const home = (req, res) => {
  console.log("here in uc");
  res.render(path.join(__dirname, "../views/index.ejs"));
};

//router.post("/users/register", newUser);
const newUser = async (req, res, next) => {
  const { name, email, password, password_confirmation, age, dob } = req.body;
  const user = {
    name,
    email,
    password,
    password_confirmation,
    age,
    dob,
  };
  try {
    const userData = await fs.readFileSync(
      path.join(__dirname, "../data/users.json"),
      "utf-8"
    );
    const users = JSON.parse(userData);
    console.log(users, typeof users);
    users[Object.keys(users).length] = user;
    const userDataString = JSON.stringify(users);
    await fs.writeFileSync(
      path.join(__dirname, "../data/users.json"),
      userDataString
    );
    res.redirect("/okay");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const okay = (req, res) => {
  res.render(path.join(__dirname, "../views/okay.ejs"));
};
module.exports = {
  home,
  newUser,
  okay,
};
