import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    yearsOfExperience: "",
    location: "",
    videoInterviewResults: "",
    codingInterviewResults: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://talenthub-qdnv.onrender.com/createUser", formData)
      .then((response) => {
        console.log("Candidate added:", response.data);
        navigate("/");

        // clear form fields after submission
        setFormData({
          name: "",
          skills: "",
          yearsOfExperience: "",
          location: "",
          videoInterviewResults: "",
          codingInterviewResults: "",
        });
      })
      .catch((error) => {
        console.error("Error adding candidate:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Add User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="skills" className="form-label">
                Skills
              </label>
              <input
                type="text"
                id="skills"
                className="form-control"
                placeholder="Enter Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="yearsOfExperience" className="form-label">
                Years of Experience
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                className="form-control"
                placeholder="Enter Years of Experience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="form-control"
                placeholder="Enter Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="videoInterviewResults" className="form-label">
                Video Interview Results
              </label>
              <input
                type="text"
                id="videoInterviewResults"
                className="form-control"
                placeholder="Video Interview Results"
                name="videoInterviewResults"
                value={formData.videoInterviewResults}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="codingInterviewResults" className="form-label">
                Coding Interview Results
              </label>
              <input
                type="text"
                id="codingInterviewResults"
                className="form-control"
                placeholder="Coding Interview Results"
                name="codingInterviewResults"
                value={formData.codingInterviewResults}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success me-2">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
