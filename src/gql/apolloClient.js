import { gql } from "@apollo/client";

import { DIRECTORY } from "./directory";

export const GET_DIRECTORY = gql`
  query GetDirectory {
    directory @client
  }
`;

export const GET_CART_HIDDEN = gql`
  query GetCartHidden {
    cartHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;
export const GET_USER = gql`
  query GetUser {
    user @client
  }
`;

// export const typeDefs = gql`
//   extend type Query {
//     cartItems: [Item]
//     isCartHidden: Boolean!
//     user: User
//   }

//   extend type User {
//     id: ID
//     displayName: String
//     email: String
//     createdAt: {
//       seconds: Int,
//       nanoseconds: Int
//     },
//   }

//   extend type Item {
//     id: ID!
//     imageUrl: String
//     name: String!
//     price: Flote
//     quantity: Int
//   }

//   extend type Mutation {
//     toggleCartHidden: Boolean!
//     setUser: User!
//     addOrRemoveFromCart(id: ID!): [Item]
//   }
// `;

export const setLoalCachse = (client) => {
  client.writeQuery({
    query: gql`
      query GetCartHidden {
        cartHidden
      }
    `,
    data: { cartHidden: true },
  });

  client.writeQuery({
    query: gql`
      query GetCartItems {
        cartItems
      }
    `,
    data: { cartItems: [] },
  });

  client.writeQuery({
    query: gql`
      query GetUser {
        user
      }
    `,
    data: { user: null },
  });

  client.writeQuery({
    query: gql`
      query GetDirectory {
        directory
      }
    `,
    data: { directory: DIRECTORY },
  });
};
