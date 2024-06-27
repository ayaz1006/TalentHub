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
      .post("http://localhost:3001/createUser", formData)
      .then((response) => {
        console.log("Candidate added:", response.data);
        navigate("/");

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
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Skills</label>
            <input
              type="text"
              placeholder="Enter Skills"
              className="form-control"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Years of Experience:</label>
            <input
              type="number"
              placeholder="Enter Years of Experience"
              className="form-control"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Location:</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Video Interview Results:</label>
            <input
              type="text"
              placeholder="Video Interview Results"
              className="form-control"
              name="videoInterviewResults"
              value={formData.videoInterviewResults}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Coding Interview Results:</label>
            <input
              type="text"
              placeholder="Coding Interview Results"
              className="form-control"
              name="codingInterviewResults"
              value={formData.codingInterviewResults}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default CreateUser;
