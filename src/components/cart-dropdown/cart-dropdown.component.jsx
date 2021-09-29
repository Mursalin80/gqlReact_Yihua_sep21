import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
// import { selectCartItems } from "../../redux/cart/cart.selectors";

import { GET_CART_ITEMS, GET_CART_HIDDEN } from "../../gql/apolloClient";
// import { addItemToCart } from "../../gql/cart.utils";

import "./cart-dropdown.styles.css";

const CartDropdown = () => {
  const history = useHistory();
  const quy1 = useQuery(GET_CART_HIDDEN);
  const {
    data: { cartItems },
  } = useQuery(GET_CART_ITEMS);

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          quy1.client.writeQuery({
            query: GET_CART_HIDDEN,
            data: { cartHidden: !quy1.data.cartHidden },
          });
          history.push("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
