import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { setLoalCachse } from "./gql/apolloClient";

import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: "https://crwn-clothing.com",
  cache: new InMemoryCache(),
});

// set Apollo client local cachse
setLoalCachse(client);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
