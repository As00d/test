import React from "react";
import CartCtx from "./CartContext";
import { useState } from "react";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const addItemToCart = function (item) {
    setItems((prevItems) => {
      return [...prevItems, item];
    });
  };
  const removeItemFromCart = function (id) {
    let removeItem = items.filter((item) => {
      return item.id !== id;
    });

    setItems(removeItem);
  };
  const cart = {
    items: items,
    addItemToCart: addItemToCart,
    removeItemFromCart: removeItemFromCart,
  };

  return <CartCtx.Provider value={cart}>{props.children}</CartCtx.Provider>;
};

export default CartProvider;
