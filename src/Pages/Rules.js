import React from "react";
import "./Rules.css";
import background from "../assets/background.jpg";

function Rules() {
  return (
    <div
      className="rules-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="rules-overlay">
        <div className="rules-card">
          <h1>Game Rules</h1>
          <p>
            The goal of <strong>Bazinga Memory</strong> is simple: find all the matching pairs of cards. 
          </p>

          <ul>
            <li>Each turn, you can flip <strong>two cards</strong>.</li>
            <li>If they match, they stay visible.</li>
            <li>If not, they’ll flip back after a short delay.</li>
            <li>The game ends once all pairs have been found.</li>
          </ul>
<br />
          <h2>Difficulty Levels:</h2>
          <ul>
            <li><strong>Easy:</strong> 6 pairs</li>
            <li><strong>Medium:</strong> 8 pairs</li>
            <li><strong>Hard:</strong> 12 pairs</li>
          </ul>

          <p className="rules-end">
            <em>Tip:</em> stay focused and put your brain to work — Sheldon won’t go easy on you!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rules;
