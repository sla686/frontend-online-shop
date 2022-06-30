import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav className="nav__top">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
