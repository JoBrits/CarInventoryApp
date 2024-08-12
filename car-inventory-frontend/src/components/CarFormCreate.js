// src/components/CarForm.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const CarFormCreate = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [owner, setOwner] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const car = { make, model, owner, registrationNumber, address, year: parseInt(year) };

    try {
      const response = await fetch('http://localhost:3003/api/cars/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.msg);
        navigate("/api/cars"); // Navigate back home if successful
      } else {
        setMessage('Error: ' + result.msg);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="create">
      <h1>Add New Car</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Make:</label>
          <input 
          type="text" 
          value={make} 
          onChange={(e) => setMake(e.target.value)} 
          required />
        </div>
        <div>
          <label>Model:</label>
          <input 
          type="text" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          required />
        </div>
        <div>
          <label>Year:</label>
          <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          required />
        </div>
        <div>
          <label>Registration Number:</label>
          <input 
          type="text" 
          value={registrationNumber} 
          onChange={(e) => setRegistrationNumber(e.target.value)} 
          required />
        </div>
        <div>
          <label>Owner:</label>
          <input 
          type="text" 
          value={owner} 
          onChange={(e) => setOwner(e.target.value)} 
          required />
        </div>
        <div>
          <label>Address:</label>
          <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required />
        </div>
        <button type="submit">Add Car</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CarFormCreate;
