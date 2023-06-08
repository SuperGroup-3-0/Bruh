// Cart.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateCartItemQuantity } from "./cartslice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.me.hasOwnProperty("id"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      console.log("Checkout");
      navigate("/checkout");
    } else {
      console.log("Please log in to checkout");
      navigate("/login");
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const parsedQuantity = isNaN(newQuantity) ? 0 : parseInt(newQuantity, 10);
    dispatch(updateCartItemQuantity({ itemId, newQuantity: parsedQuantity }));
  };

  const handleIncreaseQuantity = (itemId) => {
    const item = cart.cartItems.find((item) => item.id === itemId);
    const newQuantity = item.quantity + 1;
    handleQuantityChange(itemId, newQuantity);
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cart.cartItems.find((item) => item.id === itemId);
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      handleQuantityChange(itemId, newQuantity);
    }
  };

  return (
    <div className="cartContainer">
      <h2>Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cartEmpty">
          <p>You have no items in your cart!</p>
        </div>
      ) : (
        <div>
          <div className="cart-items">
            {cart.cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.imageUrl} alt={cartItem.name} />
                  <div>{cartItem.name}</div>
                  <p>{cartItem.price}</p>
                  <p>{cartItem.description}</p>
                  <button onClick={() => handleDeleteItem(cartItem.id)}>
                    Delete
                  </button>
                  {isLoggedIn && (
                    <div className="quantity-container">
                      <button
                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                        disabled={cartItem.quantity === 1}
                      >
                        -
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isLoggedIn && <button onClick={handleCheckout}>Checkout</button>}
        </div>
      )}
    </div>
  );
};

export default Cart;
