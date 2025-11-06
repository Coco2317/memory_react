import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/Home";
import MemoryGame from "./Pages/MemoryGame";
import Rules from "./Pages/Rules";
import Footer from "./components/Footer/Footer";
import "./styles/global.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [level, setLevel] = useState("easy");

  return (
    <Router>
      <div className="App">
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                playerName={playerName}
                setPlayerName={setPlayerName}
                level={level}
                setLevel={setLevel}
              />
            }
          />
          <Route
            path="/game"
            element={<MemoryGame playerName={playerName} level={level} />}
          />
          <Route path="/rules" element={<Rules />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
