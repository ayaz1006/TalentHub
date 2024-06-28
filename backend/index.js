//index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config(); // Load environment variables from .env file

//local db (compass)
//mongoose.connect("mongodb://localhost:27017/usersDB");

// MongoDB Atlas connection string
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Atlas database connection established successfully");
});

// Create a user (candidate)
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get("/", (req, res) => {
  const {
    name,
    skills,
    yearsOfExperience,
    location,
    videoInterviewResults,
    codingInterviewResults,
    sortBy,
  } = req.query;

  // Build query object based on provided filters
  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (skills) {
    query.skills = { $regex: skills, $options: "i" };
  }

  if (yearsOfExperience) {
    query.yearsOfExperience = parseInt(yearsOfExperience);
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (videoInterviewResults) {
    query.videoInterviewResults = {
      $regex: videoInterviewResults,
      $options: "i",
    };
  }

  if (codingInterviewResults) {
    query.codingInterviewResults = {
      $regex: codingInterviewResults,
      $options: "i",
    };
  }

  // Sort options
  let sortOptions = {};
  if (sortBy === "name") {
    sortOptions = { name: 1 }; // Sort by name ascending
  } else if (sortBy === "yearsOfExperience") {
    sortOptions = { yearsOfExperience: 1 }; // Sort by yearsOfExperience ascending
  }

  UserModel.find(query)
    .sort(sortOptions)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// For Updating data (candidates)
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      skills: req.body.skills,
      yearsOfExperience: req.body.yearsOfExperience,
      location: req.body.location,
      videoInterviewResults: req.body.videoInterviewResults,
      codingInterviewResults: req.body.codingInterviewResults,
    },
    { new: true } // To return the updated document
  )
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
