const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  image:{
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"

  },
});

const User = mongoose.model("UserInfo", userSchema);

module.exports = User;
