import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const initialFilterOptions = {
    name: "",
    skills: "",
    yearsOfExperience: "",
    location: "",
    videoInterviewResults: "",
    codingInterviewResults: "",
  };

  const [users, setUsers] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    ...initialFilterOptions,
  });

  useEffect(() => {
    fetchUsers();
  }, [filterOptions]);

  const fetchUsers = () => {
    axios
      .get("https://talenthub-qdnv.onrender.com/", { params: filterOptions })
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://talenthub-qdnv.onrender.com/deleteUser/${id}`)
      .then(() => {
        fetchUsers(); // Refresh users after deletion
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  const clearFilters = () => {
    setFilterOptions({ ...initialFilterOptions });
  };

  const handleSortByName = () => {
    axios
      .get("https://talenthub-qdnv.onrender.com/", {
        params: { ...filterOptions, sortBy: "name" },
      })
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  };

  const handleSortByExperience = () => {
    axios
      .get("https://talenthub-qdnv.onrender.com/", {
        params: { ...filterOptions, sortBy: "yearsOfExperience" },
      })
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5" style={{ transform: "scale(0.9)" }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Users List</h2>
          <div className="row mb-3 align-items-center">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                placeholder="Search by Name"
                name="name"
                value={filterOptions.name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                name="skills"
                value={filterOptions.skills || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Skills</option>
                <option value="Javascript">Javascript</option>
                <option value="Python">Python</option>
                <option value="ReactJS">ReactJS</option>
                <option value="NodeJS">NodeJS</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Java">Java</option>
                <option value="Next.js">Next.js</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                name="yearsOfExperience"
                value={filterOptions.yearsOfExperience || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Years of Experience</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((years) => (
                  <option key={years} value={years}>
                    {years} year{years !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                name="location"
                value={filterOptions.location || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Location</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi-NCR">Delhi-NCR</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-3">
              <select
                className="form-control"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                name="videoInterviewResults"
                value={filterOptions.videoInterviewResults || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Video Interview Results</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                name="codingInterviewResults"
                value={filterOptions.codingInterviewResults || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Coding Interview Results</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-secondary"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="row mb-3" style={{ gap: "0" }}>
            <div className="col-md-4">
              <button
                className="btn btn-primary w-100"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                onClick={handleSortByName}
              >
                Sort by Name
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-primary w-100"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
                onClick={handleSortByExperience}
              >
                Sort by Experience
              </button>
            </div>
            <div className="col-md-4">
              <Link
                to="/create"
                className="btn btn-success w-100"
                style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}
              >
                Add User
              </Link>
            </div>
          </div>

          <div className="table-responsive">
            <table
              className="table table-striped"
              style={{ fontSize: "0.875rem" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Skills</th>
                  <th>Years of Experience</th>
                  <th>Location</th>
                  <th>Video Interview Results</th>
                  <th>Coding Interview Results</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.skills}</td>
                    <td>{user.yearsOfExperience}</td>
                    <td>{user.location}</td>
                    <td>{user.videoInterviewResults}</td>
                    <td>{user.codingInterviewResults}</td>
                    <td>
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-sm btn-success me-1"
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user._id)}
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
