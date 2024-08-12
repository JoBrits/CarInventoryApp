import { Link } from "react-router-dom";

// destructure props
const CarsList = ({ cars, carsTile }) => {

  return (
    <>
    <h2>{carsTile}</h2>
    <div className="project-list">
      {cars.cars.map((car) => (
        <div className="project-preview" key={car._id}>
          <Link to={`/api/cars/${car._id}`}>
            <h2>{car.make} {car.model}</h2>
            <p>Reg : {car.registrationNumber}</p>
            <p>Year : {car.year}</p>
            <p>Colour : {car.colour}</p>
            <p>Owner : {car.owner}</p>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
};

export default CarsList;
