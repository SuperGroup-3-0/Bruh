import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SingleItem } from "../components/singleItem/singleItem";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import Home from "../components/home/Home";
import Cart from "../components/cart/cart";
import Checkout from "../components/cart/checkout";
import { me } from "./store";
import OrderConfirmation from "../components/cart/orderConfirmation";
import { useTranslation } from "react-i18next";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      <Routes>
        { isLoggedIn ? null :
            <>
              <Route
                path="/login"
                element={<AuthForm name="login" displayName={t('login')} />}
              />
              <Route
                path="/signup"
                element={<AuthForm name="signup" displayName={t('signup')} />}
              />
            </>
        } 
        <Route path="/*" element={<Home />} />
        <Route to="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/items/:itemId" element={<SingleItem />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
