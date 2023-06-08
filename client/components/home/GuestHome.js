import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllItemsAsync } from "./AllItemsSlice";

/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.me.username);
  const items = useSelector((state) => state.allItems.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickItem = (id) => {
    navigate(`/items/${id}`);
  };

  useEffect(() => {
    dispatch(fetchAllItemsAsync());
  }, [dispatch]);

  return (
    <div className="all-items-container">
      <div>
        <h3>Welcome, {username}</h3>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="single-item-container"
          onClick={() => handleClickItem(item.id)}
        >
          <div className="item-details">
            <img
              className="images"
              src={item.imageUrl}
              style={{ width: "200px", height: "200px" }}
              alt={item.name}
            />
          </div>
          <div className="item-content">
            <h2 className="name">{item.name}</h2>
            <h3 className="price">{item.price}</h3>
            <p className="description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
