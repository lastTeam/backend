import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; // Import Routes and Route
import HomePage from "./components/home/HomePage"; // Adjust according to your file structure
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
