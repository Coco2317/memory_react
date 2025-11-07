import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MemoryGame.css";
import deckImage from "../assets/bazinga.jpg";
import backgroundImage from "../assets/background.jpg";

// === Images ===
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";

const allImages = [img1, img2, img3, img4, img5, img6];

// === Mélange Fisher-Yates ===
const shuffleArray = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

function MemoryGame({ playerName }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const levelFromHome = params.get("level") || "easy";

  const [level, setLevel] = useState(levelFromHome);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Génération des cartes selon le niveau
  const generateCards = (difficulty) => {
    let pairCount = 3; // easy
    if (difficulty === "medium") pairCount = 6;
    if (difficulty === "hard") pairCount = 6;

    // Si pas assez d'images dans le pool, recycle le set
    const selected = [];
    while (selected.length < pairCount) {
      selected.push(...allImages);
    }

    const finalSelection = selected.slice(0, pairCount);

    // Duplique chaque image exactement 2 fois
    const duplicated = finalSelection.flatMap((img, index) => [
      { id: `${index}-a`, imgSrc: img, flipped: false },
      { id: `${index}-b`, imgSrc: img, flipped: false },
    ]);

    // Mélange complet
    const shuffled = shuffleArray(duplicated);
    return shuffled;
  };

  useEffect(() => {
    setCards(generateCards(level));
  }, [level]);

  // === Clic sur une carte ===
  const handleCardClick = (id) => {
    const clicked = cards.find((c) => c.id === id);
    if (!clicked || clicked.flipped || flippedCards.length === 2) return;

    const updated = cards.map((c) =>
      c.id === id ? { ...c, flipped: true } : c
    );
    setCards(updated);
    setFlippedCards([...flippedCards, clicked]);
  };

  // === Vérification des paires ===
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.imgSrc === second.imgSrc) {
        setMatchedCards((prev) => [...prev, first.imgSrc]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          );
        }, 700);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  // === Victoire ===
  useEffect(() => {
    if (matchedCards.length === cards.length / 2 && cards.length > 0) {
      setShowPopup(true);
    }
  }, [matchedCards, cards]);

  // === Rejouer / Changer de niveau ===
  const restartGame = (newLevel = level) => {
    setShowPopup(false);
    setMatchedCards([]);
    setFlippedCards([]);
    setCards(generateCards(newLevel));
  };

  return (
    <div
      className="game-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h2 className="game-title">
        {showPopup
          ? `Bazinga ${playerName || "Player"}! You did it!`
          : `${playerName || "Player"}, match the cards!`}
      </h2>

      {/* Contrôles du jeu */}
      <div className="game-controls">
        <label htmlFor="level">Level:</label>
        <select
          id="level"
          value={level}
          onChange={(e) => {
            const newLevel = e.target.value;
            setLevel(newLevel);
            restartGame(newLevel);
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={() => restartGame(level)}>Replay</button>
      </div>

      {/* Grille des cartes */}
      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={deckImage} alt="Bazinga" />
              </div>
              <div className="card-back">
                <img src={card.imgSrc} alt="card" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up de victoire */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Bravo {playerName || "Player"} ! 🎉</h2>
            <p>You completed the {level} level!</p>
            <button onClick={() => restartGame(level)}>Replay</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
