// Search.jsx

import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Call parent component's search function with search term
  };

  return (
    <div className="container mt-4">
      <h2>Search Candidates</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, skills, etc."
            value={searchTerm}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
