import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { useTranslation } from "react-i18next";
import Languageselector from "../LanguageSelector";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const cartItems = useSelector((state) =>
    isLoggedIn ? state.cart.cartItems : state.cart.guestCartItems
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/home");
  };

  const cartItemCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );
  const { t } = useTranslation();

  return (
    <div className="all">
      <div className="navbar-container">
        <div className="title-nav-container">
          <nav>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">{t('home')}</Link>
                <Link to="/cart">
                  {t('cart')} {cartItemCount > 0 && <span>({cartItemCount})</span>}
                </Link>
                <button type="button" onClick={logoutAndRedirectHome}>
                {t('logout')}
                </button>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/home">{t('home')}</Link>
                <Link to="/login">{t('login')}</Link>
                <Link to="/signup">{t('signup')}</Link>
                <Link to="/cart"> {t('cart')} {cartItemCount > 0 && <span>({cartItemCount})</span>}
                </Link>
              </div>
            )}
          </nav>
        </div>
        <div className="logo-container">
          <img src="/bruh_logo.png" alt="Logo" className="logo" />
          <Languageselector />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;