import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/Home";
import MemoryGame from "./Pages/MemoryGame";
import Footer from "./components/Footer/Footer";
import "./styles/global.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
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
                onStart={() => setIsPlaying(true)}
              />
            }
          />
          <Route
            path="/game"
            element={<MemoryGame playerName={playerName} level={level} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
