import React from "react";
import "./Home.css";
import background from "../assets/background.jpg";

function Home({ playerName, setPlayerName, level, setLevel, onStart }) {
  return (
    <div
      className="home-wrapper"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="home-overlay">
        <div className="home-card">
          <h1 className="home-title">Bazinga! Ready to challenge your neurons?</h1>

          <label htmlFor="pseudo">Identify yourself, player!</label>
          <input
            id="pseudo"
            className="home-input"
            type="text"
            placeholder="Enter your pseudo"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
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

          <button className="home-button" onClick={onStart}>
            Engage!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
