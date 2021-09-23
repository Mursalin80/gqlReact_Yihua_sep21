import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: "https://crwn-clothing.com",
  cache: new InMemoryCache(),
});

client.writeQuery({
  query: gql`
    query GetCartHidden {
      cartHidden
    }
  `,
  data: { cartHidden: true },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
