import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateCartItemQuantity, setCart } from "./cartslice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.me.hasOwnProperty("id"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.me.username);

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

  const calculateItemTotal = (cartItem) => {
    return cartItem.price * cartItem.quantity;
  };

  const calculateTotalItems = () => {
    return cart.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
  };

  const calculateTotalItemCost = () => {
    return cart.cartItems.reduce(
      (total, cartItem) => total + calculateItemTotal(cartItem),
      0
    );
  };

  const calculateSalesTax = () => {
    const salesTaxRate = 0.06; // 6% sales tax rate
    const totalItemCost = calculateTotalItemCost();
    const salesTax = totalItemCost * salesTaxRate;
    return salesTax;
  };

  const calculateOrderTotal = () => {
    const shippingCost = calculateShippingCost();
    const itemsTotal = calculateTotalItemCost();
    const salesTax = calculateSalesTax();
    return itemsTotal + shippingCost + salesTax;
  };

  //shipping
  const calculateShippingCost = () => {
    if (shippingMethod === "usps-ground") {
      return 10.85;
    } else if (shippingMethod === "usps-priority") {
      return 14.09;
    } else if (shippingMethod === "usps-overnight") {
      return 49.45;
    } else {
      return 0;
    }
  };

  const [shippingMethod, setShippingMethod] = useState("");
  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
  };

  //logged-in local storage
  useEffect(() => {
    if (isLoggedIn) {
      // Save cart to local storage whenever it changes
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);

  useEffect(() => {
    // Retrieve cart from local storage on component mount
    const savedCart = localStorage.getItem("cart");
    if (savedCart && isLoggedIn) {
      const parsedCart = JSON.parse(savedCart);
      dispatch(setCart(parsedCart));
    } else {
      // Clear cart when user is not logged in
      dispatch(setCart({ cartItems: [] }));
    }
  }, [dispatch, isLoggedIn]);

  // Guest cart session storage
  useEffect(() => {
    if (!isLoggedIn) {
      // Save cart to session storage with expiration time of 1 hour
      sessionStorage.setItem("cart", JSON.stringify(cart));
      const expirationTime = new Date().getTime() + 3600000; // 1 hour
      sessionStorage.setItem("cartExpiration", expirationTime.toString());
    }
  }, [cart, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Retrieve cart from session storage on component mount
      const savedCart = sessionStorage.getItem("cart");
      const expirationTime = sessionStorage.getItem("cartExpiration");
      if (savedCart && expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime <= parseInt(expirationTime)) {
          const parsedCart = JSON.parse(savedCart);
          dispatch(setCart(parsedCart));
        } else {
          sessionStorage.removeItem("cart");
          sessionStorage.removeItem("cartExpiration");
          dispatch(setCart({ cartItems: [] }));
        }
      }
    }
  }, [dispatch, isLoggedIn]);

  //setting the date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  return (
    <div className="cartContainer">
      <h2>
        {isLoggedIn
          ? `${username} Cart - ${currentMonth}/${currentDay}/${currentYear}`
          : `Guest Cart - ${currentMonth}/${currentDay}/${currentYear}`}
      </h2>
      {isLoggedIn ? (
        <div>
          {cart.cartItems.length === 0 ? (
            <div className="cartEmpty">
              <p>You have no items in your cart!</p>
            </div>
          ) : (
            <div>
              <div className="cart-items">
                {cart.cartItems.map((cartItem, index) => (
                  <div className="cart-item" key={cartItem.id + index}>
                    <div className="cart-product">
                      <img
                        src={cartItem.imageUrl}
                        style={{ width: "300px", height: "300px" }}
                      />
                      <div>Item: {cartItem.name}</div>
                      <p>Price: ${cartItem.price.toFixed(2)} USD</p>
                      <div className="quantity-container">
                        <span>Quantity: </span>
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
                    </div>
                    <p>
                      Item Total: ${calculateItemTotal(cartItem).toFixed(2)} USD
                    </p>
                    <button onClick={() => handleDeleteItem(cartItem.id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <p>Items in Cart: {calculateTotalItems()}</p>
                <p>Cart Total: ${calculateTotalItemCost().toFixed(2)} USD</p>
                <br />
                <p>Shipping Method:</p>
                <div style={{ marginLeft: "20px" }}>
                  <label>
                    <input
                      type="checkbox"
                      value="usps-ground"
                      checked={shippingMethod === "usps-ground"}
                      onChange={handleShippingMethodChange}
                    />
                    USPS Ground: $10.85 USD
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="usps-priority"
                      checked={shippingMethod === "usps-priority"}
                      onChange={handleShippingMethodChange}
                    />
                    USPS Priority: $14.09 USD
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="usps-overnight"
                      checked={shippingMethod === "usps-overnight"}
                      onChange={handleShippingMethodChange}
                    />
                    USPS Overnight: $49.45 USD
                  </label>
                </div>
                <br />
                <p>Sales Tax: ${calculateSalesTax().toFixed(2)} USD</p>
                <p>Order Total: ${calculateOrderTotal().toFixed(2)} USD</p>
              </div>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          )}
        </div>
      ) : (
        <div>

          {cart.guestCartItems.length === 0 ? (
            <div className="cartEmpty">
              <p>You have no items in your cart!</p>
            </div>
          ) : (
            <div>
              <div className="cart-items">
                {cart.guestCartItems.map((cartItem, index) => (
                  <div className="cart-item" key={cartItem.id + index}>
                    <div className="cart-product">
                      <img
                        src={cartItem.imageUrl}
                        style={{ width: "300px", height: "300px" }}
                      />
                      <div>Item: {cartItem.name}</div>
                      <p>Price: ${cartItem.price.toFixed(2)} USD</p>
                      <div className="quantity-container">
                        <span>Quantity: </span>
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
                    </div>
                    <p>
                      Item Total: ${calculateItemTotal(cartItem).toFixed(2)} USD
                    </p>
                    <button onClick={() => handleDeleteItem(cartItem.id)}>
                      Delete

       

                    </button>
                  </div>
                ))}
              </div>
              <div>
                <p>Items in Cart: {calculateTotalItems()}</p>
                <p>Cart Total: ${calculateTotalItemCost().toFixed(2)} USD</p>
                <br />
                <p>Shipping Method:</p>
                <div style={{ marginLeft: "20px" }}>
                  <label>
                    <input
                      type="checkbox"
                      value="usps-ground"
                      checked={shippingMethod === "usps-ground"}
                      onChange={handleShippingMethodChange}
                    />
                    USPS Ground: $10.85 USD
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="usps-priority"
                      checked={shippingMethod === "usps-priority"}
                      onChange={handleShippingMethodChange}
                    />
                    USPS Priority: $14.09 USD
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="usps-overnight"
                      checked={shippingMethod === "usps-overnight"}
                      onChange={handleShippingMethodChange}
                    />
                    USPS Overnight: $49.45 USD
                  </label>
                </div>
                <br />
                <p>Sales Tax: ${calculateSalesTax().toFixed(2)} USD</p>
                <p>Order Total: ${calculateOrderTotal().toFixed(2)} USD</p>
              </div>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
