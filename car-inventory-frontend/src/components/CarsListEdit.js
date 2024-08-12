import React, { useState, useEffect } from "react";

// destructure props
const CarsListEdit = ({ cars }) => {
  const [updatedCars, setUpdatedCars] = useState(cars);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    // testing
    console.log("updatedCars");
    console.log(updatedCars);
    try {
      const response = await fetch("http://localhost:3003/api/cars/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCars),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
      } else {
        setMessage("Unable to update the cars");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while updating the cars");
    }
  };

  function convertArrayToObject(array) {
    return { cars: array };
  }
  
  const handleChange = (_id, field, value) => {
    const newCars = updatedCars.cars.map((car) =>
      car._id === _id ? { ...car, [field]: value } : car
    );
   
    // convert modified array to a cars object
    const newCarsObject = convertArrayToObject(newCars);
    console.log(newCarsObject);

    setUpdatedCars(newCarsObject);
  };

  return (
    <div className="edit">
      <h1>Update Cars</h1>
      {updatedCars.cars.map((car) => (
        <div className="edit-list" key={car._id}>
          <input
            type="text"
            value={car.make}
            onChange={(e) => handleChange(car._id, "make", e.target.value)}
            placeholder="Make"
          />
          <input
            type="text"
            value={car.model}
            onChange={(e) => handleChange(car._id, "model", e.target.value)}
            placeholder="Model"
          />
          <input
            type="number"
            value={car.year}
            onChange={(e) => handleChange(car._id, "year", e.target.value)}
            placeholder="Year"
          />
        </div>
      ))}
      <button onClick={handleUpdate}>Update Cars</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CarsListEdit;
