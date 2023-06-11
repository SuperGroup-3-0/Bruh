import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../cart/cartslice";
import { fetchSingleItemAsync } from "./SingleItemSlice";

/**
 * COMPONENT
 */

export const SingleItem = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const item = useSelector((state) => {
    return state.singleItemState.singleItem;
  });
  useEffect(() => {
    dispatch(fetchSingleItemAsync(itemId));
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div id="singleItem">
      <img src={item.imageUrl} width="200" height="200" alt="Item" />
      <h1>{item.name}</h1>
      <p>${item.price}</p>
      <p>{item.description}</p>
      <div>
        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
};
export default SingleItem;
