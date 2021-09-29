import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { store, persistor } from "./redux/store";
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
