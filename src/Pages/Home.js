import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import background from "../assets/background.jpg";

function Home({ playerName, setPlayerName, level, setLevel }) {
  const navigate = useNavigate();

  const handleStart = () => {
    if (!playerName.trim()) {
      alert("Please enter your name, player!");
      return;
    }
    //Passe le niveau choisi dans l'URL
    navigate(`/game?level=${level}`);
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="home-overlay">
        <div className="home-card">
          <h1 className="home-title">Bazinga! Ready to challenge your neurons?</h1>

          <label htmlFor="playerName">Identify yourself, player!</label>
          <input
            id="playerName"
            className="home-input"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your pseudo"
          />

          <label htmlFor="level">Choose your level wisely</label>
          <select
            id="level"
            className="home-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button className="home-button" onClick={handleStart}>
            Engage!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
