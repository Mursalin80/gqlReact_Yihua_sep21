import React from "react";
// import { connect } from "react-redux";
import { useQuery } from "@apollo/client";

// import {
//   // clearItemFromCart,
//   // addItem,
//   // removeItem,
// } from "../../redux/cart/cart.actions";

import { GET_CART_ITEMS } from "../../gql/apolloClient";
import {
  clearItemFromCart,
  removeItemFromCart,
  addItemToCart,
} from "../../gql/cart.utils";

import "./checkout-item.styles.css";

let clearItem = (client, cart, item) => {
  let newCart = clearItemFromCart(cart, item);
  client.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCart },
  });
};

let removeItem = (client, cart, item) => {
  let newCart = removeItemFromCart(cart, item);
  client.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCart },
  });
};

let addItem = (client, cart, item) => {
  let newCart = addItemToCart(cart, item);
  client.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCart },
  });
};

const CheckoutItem = ({ cartItem }) => {
  const {
    data: { cartItems },
    client,
  } = useQuery(GET_CART_ITEMS);
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => removeItem(client, cartItems, cartItem)}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => addItem(client, cartItems, cartItem)}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => clearItem(client, cartItems, cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   clearItem: (item) => dispatch(clearItemFromCart(item)),
//   addItem: (item) => dispatch(addItem(item)),
//   removeItem: (item) => dispatch(removeItem(item)),
// });

export default CheckoutItem;
