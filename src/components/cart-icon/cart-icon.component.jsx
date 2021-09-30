import React from "react";
import { useQuery } from "@apollo/client";

import { GET_CART_HIDDEN, GET_CART_ITEMS } from "../../gql/apolloClient";
import { getCartItemCount } from "../../gql/cart.utils";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.css";

const CartIcon = () => {
  const { data, client } = useQuery(GET_CART_HIDDEN);
  const itemsQry = useQuery(GET_CART_ITEMS);
  let itemCount = getCartItemCount(itemsQry.data.cartItems);

  return (
    <div
      className="cart-icon"
      onClick={() =>
        client.writeQuery({
          query: GET_CART_HIDDEN,
          data: { cartHidden: !data.cartHidden },
        })
      }
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
