import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <Router>
      <div>
        <nav style={{ backgroundColor: "#a07d7d", padding: "10px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/about">About us</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
