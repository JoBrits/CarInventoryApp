// Hook
import useFetch from "../hooks/useFetch";

// Components
import CarsListEdit from "./CarsListEdit";

const CarsEdit = () => {
  const { data: cars, isPending, error } = useFetch("http://localhost:3003/api/cars");


  return (
    <div className="home">
      {/* Short circuit */}
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {cars && (
        <CarsListEdit cars={cars}/>
      )}
    </div>
  );
};

export default CarsEdit;
