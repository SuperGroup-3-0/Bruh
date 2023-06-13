import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div className="all">
      <div className="navbar-container">
        <div className="title-nav-container">
          <h1 className="title">Welcome to Bruh!</h1>
          <nav>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <Link to="/cart">Cart</Link>
                <button type="button" onClick={logoutAndRedirectHome}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/home">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/cart">Cart</Link>
              </div>
            )}
          </nav>
        </div>
        <div className="logo-container">
          <img src="/bruh_logo.png" alt="Logo" className="logo" />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
