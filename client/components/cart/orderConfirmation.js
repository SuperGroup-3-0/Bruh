import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


/**
 * COMPONENT
 */

export const OrderConfirmation = () => {
    const order = useSelector((state) => {
        return state.orderConfirmationState.cart
    });
    const username = useSelector((state) => {
        return state.auth.me.username;
    });

    return (
    <div id="order-confirmation"> 
        <img src={} width="200" height="200" alt="Confirmation" />
        <h1>Thank you for your order, {username}!</h1>
        <p>{order}</p>
        <div>
        </div>
    </div>
    );
};

export default OrderConfirmation;
