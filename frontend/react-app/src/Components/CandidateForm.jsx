// CandidateForm.jsx

import React, { useState } from "react";
import axios from "axios";

const CandidateForm = () => {
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
      .post("/api/users", formData)
      .then((response) => {
        console.log("Candidate added:", response.data);
        // Optionally, clear form fields after submission
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
    <div className="container mt-4">
      <h2>Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Skills (comma-separated):</label>
          <input
            type="text"
            className="form-control"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Years of Experience:</label>
          <input
            type="number"
            className="form-control"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Video Interview Results:</label>
          <textarea
            className="form-control"
            name="videoInterviewResults"
            value={formData.videoInterviewResults}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Coding Interview Results:</label>
          <textarea
            className="form-control"
            name="codingInterviewResults"
            value={formData.codingInterviewResults}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Candidate
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
