import React, { useState } from 'react';
import Card from './Card';

function Formulario() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};


    if (name.trim().length < 3 || name.startsWith(' ')) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres y no empezar con un espacio.';
    }


    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor, introduce un correo válido.';
    }


    const today = new Date();
    const birthDate = new Date(birthdate);
    if (!birthdate) {
      newErrors.birthdate = 'Por favor, introduce una fecha de nacimiento.';
    } else if (birthDate > today) {
      newErrors.birthdate = 'La fecha de nacimiento no puede ser en el futuro.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setErrors({});
    setSubmittedData({ name, email, age });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="input-field"
        />
        {errors.birthdate && <p className="error-message">{errors.birthdate}</p>}

        <button type="submit" className="submit-button">Enviar</button>
      </form>

      {submittedData && (
        <Card name={submittedData.name} email={submittedData.email} age={submittedData.age} />
      )}
    </div>
  );
}

export default Formulario;

