import React, { useState } from "react";
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
    <div className="App">
      <NavBar />
      {!isPlaying ? (
        <Home
          playerName={playerName}
          setPlayerName={setPlayerName}
          level={level}
          setLevel={setLevel}
          onStart={() => setIsPlaying(true)}
        />
      ) : (
        <MemoryGame playerName={playerName} level={level} />
      )}
      <Footer /> 
    </div>
  );
}

export default App;
