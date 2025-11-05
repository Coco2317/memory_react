import React from 'react';
import './card.css';

const Card = ({ imageUrl, title, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="card-back">
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
};

export default Card;