import React, { useState, useEffect } from "react";
import "./MemoryGame.css";
import deckImage from "../assets/bazinga.jpg";
import backgroundImage from "../assets/background.jpg";

// Images
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

function MemoryGame({ playerName }) {
  const [level, setLevel] = useState("facile");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [victory, setVictory] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Génération des cartes selon le niveau
  const generateCards = (difficulty) => {
    let pairCount = 3;
    if (difficulty === "moyen") pairCount = 6;
    if (difficulty === "difficile") pairCount = 12;

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

  useEffect(() => {
    setCards(generateCards(level));
  }, [level]);

  // Gestion du clic
  const handleCardClick = (id) => {
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.flipped || flippedCards.length === 2) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, clickedCard]);
  };

  // Vérifie les paires
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

  // Victoire
  useEffect(() => {
    if (matchedCards.length === cards.length / 2 && cards.length > 0) {
      setVictory(true);
      setShowPopup(true);
    }
  }, [matchedCards, cards]);

  // Rejouer
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
          : `${playerName || "Player"}, trouve les paires !`}
      </h2>

      {/*Contrôles */}
      <div className="game-controls">
        <label htmlFor="level">Niveau :</label>
        <select
          id="level"
          value={level}
          onChange={(e) => {
            const newLevel = e.target.value;
            setLevel(newLevel);
            restartGame(newLevel);
          }}
        >
          <option value="facile">Facile</option>
          <option value="moyen">Moyen</option>
          <option value="difficile">Difficile</option>
        </select>

        <button onClick={() => restartGame()}>Rejouer</button>
      </div>

      {/*Cartes */}
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

      {/* Pop-up de victoire */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Bravo {playerName || "Player"} ! </h2>
            <p>Tu as terminé le niveau {level} !</p>
            <button onClick={() => restartGame(level)}>Rejouer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
