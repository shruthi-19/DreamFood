import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Modal from '../screens/Modal';
import Cart from '../screens/Cart';
export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  // Update authToken state whenever localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null); // update state to re-render navbar
    navigate("/login");
  };
  const loadCart = () => {
    setCartView(true)
  }
  const items = useCart();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">DreamFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>
            {authToken && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/orders">My Orders</Link>
              </li>
            )}
          </ul>

          {!authToken ? (
            <div className="d-flex">
              <Link className="fs-5 btn bg-white text-success nav-link mx-1" to="/login">Login</Link>
              <Link className="fs-5 btn bg-white text-success nav-link mx-1" to="/createuser">Signup</Link>
            </div>
          ) : (
            <div className="d-flex">
              <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                <Badge color="secondary" badgeContent={items.length} >
                  <ShoppingCartIcon />
                </Badge>
                Cart
              </div>

              {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

              <div className="btn bg-white text-danger nav-link mx-1 fs-5" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
