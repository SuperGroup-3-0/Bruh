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
        <img src="https://img.freepik.com/free-vector/verified-concept-illustration_114360-5152.jpg?w=1480&t=st=1686677684~exp=1686678284~hmac=a00ec101474be46acd191f6fba0867bfdfe8c42879914613011102b481b46826" width="200" height="200" alt="Confirmation" />
        <h1>Thank you for your order, {username}!</h1>
        <p>{order}</p>
        <div>
        </div>
    </div>
    );
};

export default OrderConfirmation;
