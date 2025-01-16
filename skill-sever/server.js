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
const http = require("http");
const socketio = require("socket.io");
const User = require("./Models/user.Model.js");
const SkilledPerson = require("./Models/skilledPerson.Model.js");

dotenv.config();
const app = express();
const port = 5000;
const JWT_SECRET = process.env.JWT_SECRET;

const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


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
  const { name, email, password, userType } = req.body;

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
      userType: userType,
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
      JWT_SECRET,
      { expiresIn: "1d" }
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

//userData
app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET,(err,res) =>{
      if(err){
        return "token expired"
      }
      return res
    });
    console.log(user);
    if(user == "token expired"){
      return res.send({ status: "error", data: "token expired" });
    }
    const userEmail = user.email;
    User.findOne({ email: userEmail }).then((data) => {
      res.send({ status: "ok", data: data });
    }).catch((error) => {
      return res.send({ status: "error", error: error });
    });
  } catch (error) {
    
  }
})
//get all users
app.get("/getAllUser", async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { fname: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
      ],
    };
  }

  try {
    const allUser = await User.find(query);
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    await User.deleteOne({ _id: userid })
    
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Failed to delete user" });
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


//*********Skilled Person************ */
//set Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadFiles = multer({ storage: storage });
//createSkilledPerson
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

      io.emit("newSkilledPerson", newSkilledPerson);
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

//get all skilled persons
app.get("/getAllSkilledProfile", async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { name: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
        { experience: { $regex: searchData, $options: "i" } },
        { location: { $regex: searchData, $options: "i" } },
        { contact: { $regex: searchData, $options: "i" } },
      
        { occupation: { $regex: searchData, $options: "i" } },
        { about: { $regex: searchData, $options: "i" } },
      ],
    };
  }

  try {
    const allUser = await SkilledPerson.find(query);
    const usersWithFileUrls = allUser.map(user => ({
      ...user._doc,
      cv: user.cv ? `http://localhost:5000/${user.cv}` : null,
    }));
    res.send({ status: "ok", data: usersWithFileUrls });
  } catch (error) {
    console.log(error);
  }
})

//fiindAllSkilledPersons
app.get("/getAllSkilledPersons", async (req, res) => {
  try {
    const skilledPersons = await SkilledPerson.find({ isAccepted: true });
    res.send({ status: "ok", data: skilledPersons });
  } catch (error) {
    return res.send({ status: "error", error: error });
  }
});


// Accept or reject user profile
app.post('/admin/acceptRejectUser', async (req, res) => {
  const { userId, isAccepted } = req.body;
  try {
    const skilledPerson = await SkilledPerson.findById(userId);
    if (!skilledPerson) {
      return res.status(404).json({ success: false, message: 'Skilled person not found' });
    }

    skilledPerson.isAccepted = isAccepted;
    const message = `Your profile has been ${isAccepted ? 'accepted' : 'rejected'}`;
    skilledPerson.notifications.push({ message });
    await skilledPerson.save();
   
    // Find the corresponding user and send a notification
    const user = await User.findOne({ email: skilledPerson.email });
    if (user) {
      user.notifications.push({ message });
      await user.save();
    }

    io.emit('userUpdated', { userId, isAccepted });
    res.json({ success: true, message: `User profile ${isAccepted ? 'accepted' : 'rejected'}` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update user profile', error: error.message });
  }
});
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Get notifications for a user
app.get('/user/notifications/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, notifications: user.notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve notifications', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
