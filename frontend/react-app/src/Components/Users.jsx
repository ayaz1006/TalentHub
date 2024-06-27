// Users.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  //search
  const [searchTerms, setSearchTerms] = useState({
    name: "",
    skills: "",
    yearsOfExperience: "",
    location: "",
    videoInterviewResults: "",
    codingInterviewResults: "",
  });

  //search
  useEffect(() => {
    const {
      name,
      skills,
      yearsOfExperience,
      location,
      videoInterviewResults,
      codingInterviewResults,
    } = searchTerms;
    axios
      .get(
        `https://talenthub-qdnv.onrender.com?name=${name}&skills=${skills}&yearsOfExperience=${yearsOfExperience}&location=${location}&videoInterviewResults=${videoInterviewResults}&codingInterviewResults=${codingInterviewResults}`
      )
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, [searchTerms]);

  const handleDelete = (id) => {
    axios
      .delete("https://talenthub-qdnv.onrender.com/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          {/* search*/}
          <input
            type="text"
            placeholder="Search by Name"
            className="form-control mb-3"
            value={searchTerms.name}
            onChange={(e) =>
              setSearchTerms({ ...searchTerms, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Search by Skills"
            className="form-control mb-3"
            value={searchTerms.skills}
            onChange={(e) =>
              setSearchTerms({ ...searchTerms, skills: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Search by Years of Experience"
            className="form-control mb-3"
            value={searchTerms.yearsOfExperience}
            onChange={(e) =>
              setSearchTerms({
                ...searchTerms,
                yearsOfExperience: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Search by Location"
            className="form-control mb-3"
            value={searchTerms.location}
            onChange={(e) =>
              setSearchTerms({ ...searchTerms, location: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Search by Video Interview Results"
            className="form-control mb-3"
            value={searchTerms.videoInterviewResults}
            onChange={(e) =>
              setSearchTerms({
                ...searchTerms,
                videoInterviewResults: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Search by Coding Interview Results"
            className="form-control mb-3"
            value={searchTerms.codingInterviewResults}
            onChange={(e) =>
              setSearchTerms({
                ...searchTerms,
                codingInterviewResults: e.target.value,
              })
            }
          />

          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Skills</th>
                <th>YOE</th>
                <th>Location</th>
                <th>VideoInterviewResults</th>
                <th>CodingInterviewResults</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.skills}</td>
                    <td>{user.yearsOfExperience}</td>
                    <td>{user.location}</td>
                    <td>{user.videoInterviewResults}</td>
                    <td>{user.codingInterviewResults}</td>
                    <td>
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-success"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
