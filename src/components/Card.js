import React from 'react';

function Card({ name, email, age }) {
  return (
    <div className="card">
      <h2>Información ingresada:</h2>
      <p><strong>Nombre:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Edad:</strong> {age} años</p>
    </div>
  );
}

export default Card;

