var express = require("express");
var router = express.Router();
// mongoose require
var mongoose = require("mongoose");
const { param } = require(".");

//creating collection of schema
const userSchema = {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
};

//to userSchema for creating model
const User = mongoose.model("users", userSchema, "users");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const data = await User.find({});
  console.log(data);
  res.send(data);
});

// finding with id
router.get("/:id", async function (req, res, next) {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);
  res.send(user);
});
// Upadate by id
router.put("/:id", async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    console.log(error)
  }
});
// Delete by id
router.delete("/:id", async function (req, res, next) {
  console.log(req.params.id);
  const user = await User.findByIdAndDelete(req.params.id);
  res.send(user);
});

// POST /users
router.post("/", async (req, res) => {
  console.log(req.body);
  // creating user data to save database
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  });
  //saving into database mongoose
  const userRes = await newUser.save();
  res.send(userRes);
});
module.exports = router;
