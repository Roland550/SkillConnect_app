const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const User = require("./Models/user.Model.js");
const SkilledPerson = require("./Models/skilledPerson.Model.js");

dotenv.config();
const app = express();
const port = 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const mongoUrl = process.env.MONGO_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
//register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  const encryptedPassword = await bcrypt.hash(password, 10);

  if (oldUser) {
    return res.send({ status: "error", error: "User already exists" });
  }
  try {
    await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });
    res.send({ status: "ok", data: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: error });
  }
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.send({ status: "error", error: "User does not exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      JWT_SECRET
    );
    if (res.status(201)) {
      res.send({ status: "ok", data: token });
    } else {
      res.send({ status: "error", error: "Invalid credentials" });
    }
  } else {
    res.send({ status: "error", error: "Errors" });
  }
});

//udpate user details
app.post("/updateuser", async (req, res) => {
  const { email, name, password, image } = req.body;

  try {
    await User.updateOne(
      { email: email },
      { $set: { name: name, password: password, image: image } }
    );
    res.send({ status: "ok", data: "User updated successfully" });
  } catch (error) {
    return res.send({ status: "error", error: error });
  }
});

//get user details
app.post("/getuser", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    User.findOne({ email: userEmail }).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    return res.send({ status: "error", error: "Invalid token" });
  }
});

//set Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadFiles = multer({ storage: storage });

app.post(
  "/fileupload",
  uploadFiles.fields([
    { name: "cv", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "birthdate", maxCount: 1 },
    
  ]),
  async (req, res, next) => {
    const files = req.files;
    if (!files) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    try {
      const {
        name,
        email,
        experience,
        location,
        contact,
        description,
        image,
        cv,
        certificate,
        birthdate,
        occupation,
        about,
      } = req.body;
      const existingUser = await SkilledPerson.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const newSkilledPerson = new SkilledPerson({
        name,
        email,
        experience,
        location,
        contact,
        description,
        occupation,
        about,

        image,
        cv: files.cv ? files.cv[0].path : null,
        certificate: files.certificate ? files.certificate[0].path : null,
        birthdate: files.birthdate ? files.birthdate[0].path : null,
      });

      await newSkilledPerson.save();
      res.json({
        success: true,
        statusCode: 200,
        skilledPerson: newSkilledPerson,
      });
    } catch (error) {
      next(error);
    }
  }
);

//fiindAllSkilledPersons
app.get("/getAllSkilledPersons", async (req, res) => {
  try {
    const skilledPersons = await SkilledPerson.find();
    res.send({ status: "ok", data: skilledPersons });
  } catch (error) {
    return res.send({ status: "error", error: error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
