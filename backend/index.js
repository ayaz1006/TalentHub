//index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

//local db (compass)
// mongoose.connect("mongodb://localhost:27017/usersDB");

// MongoDB Atlas connection string
const uri =
  "mongodb+srv://ayazali9910:!1Qwerty!1@cluster0.l44p2f8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

//Fetch users based on search
app.get("/", (req, res) => {
  const {
    name,
    skills,
    yearsOfExperience,
    location,
    videoInterviewResults,
    codingInterviewResults,
  } = req.query;
  const nameQuery = name ? { name: { $regex: name, $options: "i" } } : {};
  const skillsQuery = skills
    ? { skills: { $regex: skills, $options: "i" } }
    : {};
  const yearsOfExperienceQuery = yearsOfExperience
    ? { yearsOfExperience: yearsOfExperience }
    : {};
  const locationQuery = location
    ? { location: { $regex: location, $options: "i" } }
    : {};
  const videoInterviewResultsQuery = videoInterviewResults
    ? {
        videoInterviewResults: { $regex: videoInterviewResults, $options: "i" },
      }
    : {};
  const codingInterviewResultsQuery = codingInterviewResults
    ? {
        codingInterviewResults: {
          $regex: codingInterviewResults,
          $options: "i",
        },
      }
    : {};

  const query = {
    ...nameQuery,
    ...skillsQuery,
    ...yearsOfExperienceQuery,
    ...locationQuery,
    ...videoInterviewResultsQuery,
    ...codingInterviewResultsQuery,
  };

  UserModel.find(query)
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
      skils: req.body.skills,
      yearsOfExperience: req.body.yearsOfExperience,
      location: req.body.location,
      videoInterviewResults: req.body.videoInterviewResults,
      codingInterviewResults: req.body.codingInterviewResults,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
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
