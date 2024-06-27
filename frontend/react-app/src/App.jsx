import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Components/Users";
import CreateUser from "./Components/CreateUser";
import UpdateUser from "./Components/UpdateUser";

// App.jsx

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
