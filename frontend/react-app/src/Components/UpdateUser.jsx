import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    skills: "",
    yearsOfExperience: "",
    location: "",
    videoInterviewResults: "",
    codingInterviewResults: "",
  });

  useEffect(() => {
    axios
      .get(`https://talenthub-qdnv.onrender.com/getUser/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://talenthub-qdnv.onrender.com/updateUser/${id}`, user)
      .then(() => {
        alert("User updated successfully");
        navigate("/"); // Redirect to home page after update
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Update User</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="skills" className="form-label">
                Skills
              </label>
              <textarea
                id="skills"
                className="form-control"
                name="skills"
                value={user.skills}
                onChange={handleChange}
                rows={3}
                placeholder="Enter skills separated by commas"
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
                name="yearsOfExperience"
                value={user.yearsOfExperience}
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
                name="location"
                value={user.location}
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
                name="videoInterviewResults"
                value={user.videoInterviewResults}
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
                name="codingInterviewResults"
                value={user.codingInterviewResults}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-success btn-sm me-md-2">
                Update
              </button>
              <Link to="/" className="btn btn-secondary btn-sm">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
