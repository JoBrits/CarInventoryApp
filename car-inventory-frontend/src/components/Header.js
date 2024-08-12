import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar">
      <h1>Jo's Mongo Cars</h1>
      <div className="links">
        <Link to="/api/cars">All Cars</Link>
        <Link to="/api/cars/new">Add New Car</Link>
        <Link to="/api/cars/edit">Edit Multiple Cars</Link>
      </div>
    </nav>
  );
};

export default Header;