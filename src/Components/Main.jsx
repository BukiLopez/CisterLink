// src/Main.js
import React from 'react';
import './Main.css';
import tinaco from './img/Tinaco.png';
import ph from './img/ph.png';
import turbidez from './img/turbidez.png';


const Card = ({ image, title }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
    </div>
  );
};

function Main() {
  const cardsData = [
    {
      image: tinaco,
      title: 'Tinaco'
    },
    {
      image: ph,
      title: 'pH'
    },
    {
      image: turbidez,
      title: 'Turbidez'
    }
  ];

  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <Card key={index} image={card.image} title={card.title} />
      ))}
    </div>
  );
};

export default Main;
