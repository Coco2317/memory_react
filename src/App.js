import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
    <Router basename="/memory_react">
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
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

          {/* Sécurité : si route inconnue → Home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
