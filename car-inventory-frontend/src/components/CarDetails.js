import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const CarDetails = () => {
  let { carID } = useParams();
  const { data: car, error, isPending } = useFetch(carID);
  const [carEdit, setCarEdit] = useState({ make: '', model: '', year: '', registrationNumber: '', owner: '', address: '' });
  const [message, setMessage] = useState('');
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (car) {
      setCarEdit({
        make: car.cars.make,
        model: car.cars.model,
        year: car.cars.year,
        registrationNumber: car.cars.registrationNumber,
        owner: car.cars.owner,
        address: car.cars.address,
      });
    }
  }, [car]);

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarEdit({ ...carEdit, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // testing
    console.log(carEdit)
    try {
      const response = await fetch(`http://localhost:3003/api/cars/${carID}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(carEdit)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.msg);
        navigate(`/api/cars/${carID}`); // Navigate back to the car details page if successful
      } else {
        setMessage('Error: ' + result.msg);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3003/api/cars/${carID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        navigate("/api/cars/");
      } else {
        const result = await response.json();
        setMessage('Error: ' + result.msg);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="project-details">
      {isPending && <div>Loading....</div>}
      {error && <div>{error}</div>}
      {update && (
        <>
          <h1>Update Details</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Make:</label>
              <input
                type="text"
                name="make"
                value={carEdit.make}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Model:</label>
              <input
                type="text"
                name="model"
                value={carEdit.model}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Year:</label>
              <input
                type="number"
                name="year"
                value={carEdit.year}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Registration Number:</label>
              <input
                type="text"
                name="registrationNumber"
                value={carEdit.registrationNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Owner:</label>
              <input
                type="text"
                name="owner"
                value={carEdit.owner}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={carEdit.address}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit Update</button>
          </form>
        </>
      )}
      {!update && car && (
        <>
          <article>
            <h1>Car Details</h1>
            <h2>
              {car.cars.make} {car.cars.model}
            </h2>
            <p>Make : {car.cars.make}</p>
            <p>Model : {car.cars.model}</p>
            <p>Year : {car.cars.year}</p>
            <p>Registration Number : {car.cars.registrationNumber}</p>
            <p>Owner : {car.cars.owner}</p>
            <p>Address : {car.cars.address}</p>
          </article>
          <div className="project-details-buttons">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
      {message && <div>{message}</div>}
    </div>
  );
};

export default CarDetails;
