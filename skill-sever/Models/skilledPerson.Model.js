const express = require("express");
const mongoose = require("mongoose");

const skilledPersonSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    
   
    experience: {
        type: Number,
        default: 0,
    },
    location:{
        type: String,
        default: "Unknown",
    },
    contact: String,
    about: String,
    image: {
        type: String,
        default:
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    occupation: {
        type: String,
        default: "Unknown",
    },
    cv: String,
    certificate: String,
    birthdate: String,
    rating: Number,
    reviews: Array,
    isVerified: Boolean,
    isBlocked: Boolean,
    

});

const SkilledPerson = mongoose.model("SkilledPersonInfo", skilledPersonSchema);

module.exports = SkilledPerson;
    