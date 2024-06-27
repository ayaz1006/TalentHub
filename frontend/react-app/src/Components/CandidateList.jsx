// CandidateList.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    axios
      .get("/api/users")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  };

  const deleteCandidate = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then((response) => {
        console.log("Candidate deleted:", response.data);
        // Update state after deletion
        setCandidates(candidates.filter((candidate) => candidate._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting candidate:", error);
      });
  };

  const handleSearch = () => {
    axios
      .get(`/api/users/search?name=${searchTerm}`)
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error searching candidates:", error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h2>Candidate List</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <ul className="list-group">
        {candidates.map((candidate) => (
          <li key={candidate._id} className="list-group-item">
            <div>
              <h5 className="mb-1">{candidate.name}</h5>
              <p className="mb-1">
                <strong>Skills:</strong> {candidate.skills.join(", ")}
              </p>
              <p className="mb-1">
                <strong>Experience:</strong> {candidate.yearsOfExperience} years
              </p>
              <p className="mb-1">
                <strong>Location:</strong> {candidate.location}
              </p>
              <p className="mb-1">
                <strong>Video Interview Results:</strong>{" "}
                {candidate.videoInterviewResults}
              </p>
              <p className="mb-1">
                <strong>Coding Interview Results:</strong>{" "}
                {candidate.codingInterviewResults}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => deleteCandidate(candidate._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
