// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from './components/Header';
import Home from './components/Home'
import CarDetails from './components/CarDetails'
import CarsEdit from './components/CarsEdit'
import CarFormCreate from './components/CarFormCreate';
import NotFound from './components/NotFound'

const App = () => (
  <Router>
    <Header />
    <div className="content">
    <Routes>
      <Route exact path='/api/cars' element={<Home />}/>
      <Route path='/api/cars/:carID' element={<CarDetails />}/>
      <Route path='/api/cars/edit' element={<CarsEdit />}/>
      <Route path='/api/cars/new' element={<CarFormCreate />}/>
      <Route path='/*' element={<NotFound />}/>
    </Routes>
    </div>
  </Router>
);

export default App;
