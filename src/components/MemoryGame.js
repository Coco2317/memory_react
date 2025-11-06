import React, { useState, useEffect } from 'react';
import './MemoryGame.css';
import deckImage from '../assets/deck/deck.jpg';
import backgroundImage from '../assets/background/background.jpg';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';
import img5 from '../assets/images/img5.jpg';
import img6 from '../assets/images/img6.jpg';

const images = [img1, img2, img3, img4, img5, img6];

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        const shuffledCards = [...images, ...images]
            .sort(() => Math.random() - 0.5)
            .map((image, index) => ({ id: index, image, flipped: false }));
        setCards(shuffledCards);
    }, []);

    const handleCardClick = (id) => {
        const newCards = [...cards];
        const card = newCards.find(card => card.id === id);
        if (!card.flipped && flippedCards.length < 2) {
            card.flipped = true;
            setFlippedCards([...flippedCards, card]);
            setCards(newCards);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.image === secondCard.image) {
                setMatchedCards([...matchedCards, firstCard.image]);
            } else {
                setTimeout(() => {
                    const newCards = cards.map(card => {
                        if (card.id === firstCard.id || card.id === secondCard.id) {
                            card.flipped = false;
                        }
                        return card;
                    });
                    setCards(newCards);
                }, 1000);
            }
            setFlippedCards([]);
        }
    }, [flippedCards, cards, matchedCards]);

    return (
        <div className="memory-game" style={{ backgroundImage: `url(${backgroundImage})` }}>
            {cards.map(card => (
                <div key={card.id} className="card" onClick={() => handleCardClick(card.id)}>
                    {card.flipped || matchedCards.includes(card.image) ? (
                        <img src={card.image} alt="Memory Card" />
                    ) : (
                        <img src={deckImage} alt="Deck" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default MemoryGame;