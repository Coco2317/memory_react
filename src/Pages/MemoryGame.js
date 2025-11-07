import React, { useState, useEffect } from "react";
import "./MemoryGame.css";
import deckImage from "../assets/bazinga.jpg"; // dos des cartes
import backgroundImage from "../assets/background.jpg";

//images
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

function MemoryGame({ playerName, level }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [victory, setVictory] = useState(false);

  //Génération et mélange des cartes selon le niveau
  useEffect(() => {
    let pairCount = 6;
    if (level === "medium") pairCount = 8;
    if (level === "hard") pairCount = 10;

    const selectedImages = images.slice(0, pairCount);
    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        flipped: false,
      }));
    setCards(shuffledCards);
  }, [level]);

  //Gestion du clic sur une carte
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
        }, 900);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  //Vérifie la victoire
  useEffect(() => {
    if (matchedCards.length === cards.length / 2 && cards.length > 0) {
      setVictory(true);
    }
  }, [matchedCards, cards]);

  // Relancer une partie
  const restartGame = () => {
    setVictory(false);
    setMatchedCards([]);
    setFlippedCards([]);
    const reshuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((c) => ({ ...c, flipped: false }));
    setCards(reshuffled);
  };

  return (
    <div
      className="game-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h2 className="game-title">
        {victory
          ? `Congrats ${playerName || "Player"}! You did it!`
          : `${playerName || "Player"}, match the cards!`}
      </h2>

      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={card.image} alt="card front" />
              </div>
              <div className="card-back">
                <img src={deckImage} alt="card back" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {victory && (
        <div className="victory-message">
          <h3>Bazinga! You won !</h3>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
