import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();

  const [name, setName] = useState();
  const [skills, setSkills] = useState();
  const [yearsOfExperience, setYearsOfExperience] = useState();
  const [location, setLocation] = useState();
  const [videoInterviewResults, setVideoInterviewResults] = useState();
  const [codingInterviewResults, setCodingInterviewResults] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setSkills(result.data.skills);
        setYearsOfExperience(result.data.yearsOfExperience);
        setLocation(result.data.location);
        setVideoInterviewResults(result.data.videoInterviewResults);
        setCodingInterviewResults(result.data.codingInterviewResults);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateUser/" + id, {
        name,
        skills,
        yearsOfExperience,
        location,
        videoInterviewResults,
        codingInterviewResults,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating candidate:", error);
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Skills</label>
            <input
              type="text"
              placeholder="Enter Skills"
              className="form-control"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Years of Experience:</label>
            <input
              type="number"
              placeholder="Enter Years of Experience"
              className="form-control"
              name="yearsOfExperience"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Location:</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="form-control"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Video Interview Results:</label>
            <input
              type="text"
              placeholder="Video Interview Results"
              className="form-control"
              name="videoInterviewResults"
              value={videoInterviewResults}
              onChange={(e) => setVideoInterviewResults(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Coding Interview Results:</label>
            <input
              type="text"
              placeholder="Coding Interview Results"
              className="form-control"
              name="codingInterviewResults"
              value={codingInterviewResults}
              onChange={(e) => setCodingInterviewResults(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
