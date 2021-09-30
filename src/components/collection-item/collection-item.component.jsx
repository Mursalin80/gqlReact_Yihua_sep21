import React from "react";

import { useQuery } from "@apollo/client";

import CustomButton from "../custom-button/custom-button.component";

import { GET_CART_ITEMS } from "../../gql/apolloClient";
import { addItemToCart } from "../../gql/cart.utils";

import "./collection-item.styles.css";

const CollectionItem = ({ item, addItem }) => {
  const { data, client } = useQuery(GET_CART_ITEMS);

  const { name, price, imageUrl } = item;
  let newCartItems = addItemToCart(data.cartItems, item);

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <CustomButton
        onClick={() =>
          client.writeQuery({
            query: GET_CART_ITEMS,
            data: { cartItems: newCartItems },
          })
        }
        inverted
      >
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
