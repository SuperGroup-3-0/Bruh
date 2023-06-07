import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleItemAsync } from "./SingleItemSlice";

/**
 * COMPONENT
 */

export const SingleItem = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
  
    const item = useSelector((state) => {
      return state.singleItemState.singleItem
    });
    useEffect(() => {
      dispatch(fetchSingleItemAsync(itemId));
    }, [dispatch]);
    
    return (
      <div id="singleItem">
         <img src={item.imageUrl} width="200" height="200"/>
          <h1>Item Name: { item.name }</h1>
          <p>Item Price: {item.price}</p>
          <p>Item Description: {item.description}</p>
              
      </div>
    )
  };

export default SingleItem;

