import React, { useState, useEffect } from "react";
import "./MemoryGame.css";
import deckImage from "../assets/bazinga.jpg";
import backgroundImage from "../assets/background.jpg";

// Images du jeu
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

function MemoryGame({ playerName, level: initialLevel }) {
  // Si le niveau vient de Home, on le garde
  const [level, setLevel] = useState(initialLevel || "easy");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [victory, setVictory] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Génération des cartes selon le niveau
  const generateCards = (difficulty) => {
    let pairCount = 3; // easy
    if (difficulty === "medium") pairCount = 6;
    if (difficulty === "hard") pairCount = 12;

    const selectedImages = images.slice(0, pairCount);
    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        flipped: false,
      }));

    return shuffledCards;
  };

  // Chargement initial
  useEffect(() => {
    setCards(generateCards(level));
  }, [level]);

  // Gestion du clic sur une carte
  const handleCardClick = (id) => {
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.flipped || flippedCards.length === 2) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, clickedCard]);
  };

  //Vérifie les paires
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.image === second.image) {
        setMatchedCards((prev) => [...prev, first.image]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.image === first.image || card.image === second.image
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 800);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  // Vérifie la victoire
  useEffect(() => {
    if (matchedCards.length === cards.length / 2 && cards.length > 0) {
      setVictory(true);
      setShowPopup(true);
    }
  }, [matchedCards, cards]);

  // Rejouer ou changer de niveau
  const restartGame = (newLevel = level) => {
    setVictory(false);
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
        {victory
          ? `Bazinga ${playerName || "Player"}! You did it!`
          : `${playerName || "Player"}, match the cards!`}
      </h2>

      {/*Contrôles du jeu */}
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

        <button onClick={() => restartGame()}>Replay</button>
      </div>

      {/*Grille des cartes */}
      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={deckImage} alt="Bazinga back" />
              </div>
              <div className="card-back">
                <img src={card.image} alt="card front" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup de victoire */}
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
