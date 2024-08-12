// Hook
import useFetch from "../hooks/useFetch";

// Components
import CarsList from "./CarsList";

const Home = () => {
  const { data: cars, isPending, error } = useFetch("http://localhost:3003/api/cars");
  
  // testing
  console.log(cars);

  return (
    <div className="home">
      {/* Short circuit */}
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {cars && (
        <CarsList
          cars={cars}
          carsTile="All cars"
        />
      )}
    </div>
  );
};

export default Home;
