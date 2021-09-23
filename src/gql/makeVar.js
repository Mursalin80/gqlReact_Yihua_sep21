import { gql } from "@apollo/client";

export const GET_CART_HIDDEN = gql`
  query GetCartHidden {
    cartHidden @client
  }
`;
