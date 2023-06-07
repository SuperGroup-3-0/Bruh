import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateCartItemQuantity } from "./cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.me.hasOwnProperty("id"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteItem = async (itemId) => {
    await dispatch(removeFromCart(itemId));
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
    dispatch(updateCartItemQuantity({ itemId, quantity: newQuantity }));
  };

  const handleIncreaseQuantity = (itemId) => {
    const item = cart.cartItems.find((item) => item.id === itemId);
    const newQuantity = item.quantity + 1;
    handleQuantityChange(itemId, newQuantity);
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cart.cartItems.find((item) => item.id === itemId);
    const newQuantity = item.quantity - 1;
    handleQuantityChange(itemId, newQuantity);
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
          <div className="names">
            <h3>Product</h3>
            <h3>Price</h3>
            <h3>Description</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.imageUrl} alt={cartItem.name} />
                  <div>{cartItem.name}</div>
                  <p>{cartItem.price}</p>
                  <p>{cartItem.description}</p>
                  {isLoggedIn && (
                    <>
                      <button onClick={() => handleDeleteItem(cartItem.id)}>
                        Delete
                      </button>
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
                    </>
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
