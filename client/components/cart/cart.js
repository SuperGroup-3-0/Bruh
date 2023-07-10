import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateCartItemQuantity, setCart } from "./cartslice";
import { useTranslation } from "react-i18next";



const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.me.hasOwnProperty("id"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.me.username);
  const { t } = useTranslation();

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
    if (isLoggedIn) {
      const item = cart.cartItems.find((item) => item.id === itemId);
      if (item && item.quantity) {
        const newQuantity = item.quantity + 1;
        handleQuantityChange(itemId, newQuantity);
      }
    } else {
      const item = cart.guestCartItems.find((item) => item.id === itemId);
      if (item && item.quantity) {
        const newQuantity = item.quantity + 1;
        handleQuantityChange(itemId, newQuantity);
      }
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    if (isLoggedIn) {
      const item = cart.cartItems.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        handleQuantityChange(itemId, newQuantity);
      }
    } else {
      const item = cart.guestCartItems.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        handleQuantityChange(itemId, newQuantity);
      }
    }
  };

  const calculateItemTotal = (cartItem) => {
    return cartItem.price * cartItem.quantity;
  };

  const calculateTotalItems = () => {
    let totalItems = 0;
    if (isLoggedIn) {
      totalItems = cart.cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
    } else {
      totalItems = cart.guestCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
    }
    return totalItems;
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
      // Save cart to local storage with expiration time of 1 hour
      localStorage.setItem("cart", JSON.stringify(cart));
      const expirationTime = new Date().getTime() + 3600000; // 1 hour
      localStorage.setItem("cartExpiration", expirationTime.toString());
    }
  }, [cart, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Retrieve cart from local storage on component mount
      const savedCart = localStorage.getItem("cart");
      const expirationTime = localStorage.getItem("cartExpiration");
      if (savedCart && expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime <= parseInt(expirationTime)) {
          const parsedCart = JSON.parse(savedCart);
          dispatch(setCart(parsedCart));
        } else {
          localStorage.removeItem("cart");
          localStorage.removeItem("cartExpiration");
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
          ? `${username} ${t('logged-in-cart')} - ${currentDay}/${currentMonth}/${currentYear}`
          : `${t('guest-cart')} - ${currentDay}/${currentMonth}/${currentYear}`}
      </h2>
      {isLoggedIn ? (
        <div>
          {cart.cartItems.length === 0 ? (
            <div className="cartEmpty">
              <p>{t('no-items')}</p>
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
                      <div>{t('item')} {cartItem.name}</div>
                      <p>{t('price')} ${cartItem.price.toFixed(2)}</p>
                      <div className="quantity-container">
                        <span>{t('quantity')} </span>
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
                    {t('item-total')} ${calculateItemTotal(cartItem).toFixed(2)} 
                    </p>
                    <button onClick={() => handleDeleteItem(cartItem.id)}>
                    {t('delete')}
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <p>{t('items-in-cart')} {calculateTotalItems()}</p>
                <p>{t('cart-total')} ${calculateTotalItemCost().toFixed(2)}</p>
                <br />
                <p>{t('shipping-method')}</p>
                <div style={{ marginLeft: "20px" }}>
                  <label>
                    <input
                      type="checkbox"
                      value="usps-ground"
                      checked={shippingMethod === "usps-ground"}
                      onChange={handleShippingMethodChange}
                    />
                    {t('ground')} $10.85 
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="usps-priority"
                      checked={shippingMethod === "usps-priority"}
                      onChange={handleShippingMethodChange}
                    />
                    {t('priority')} $14.09 
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="usps-overnight"
                      checked={shippingMethod === "usps-overnight"}
                      onChange={handleShippingMethodChange}
                    />
                    {t('overnight')} $49.45 
                  </label>
                </div>
                <br />
                <p>{t('sales-tax')} ${calculateSalesTax().toFixed(2)} </p>
                <p>{t('order-total')} ${calculateOrderTotal().toFixed(2)} </p>
              </div>
              <button onClick={handleCheckout}>{t('checkout')}</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {cart.guestCartItems.length === 0 ? (
            <div className="cartEmpty">
              <p>{t('no-items')}</p>
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
