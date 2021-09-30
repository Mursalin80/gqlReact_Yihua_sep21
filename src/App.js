import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";

import { GET_CART_HIDDEN, GET_USER } from "./gql/apolloClient";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

const App = (props) => {
  const apolloClient = useApolloClient();

  // componentDidMount()
  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          apolloClient.writeQuery({
            query: GET_USER,
            data: { user: { id: snapShot.id, ...snapShot.data() } },
          });
        });
      }

      apolloClient.writeQuery({
        query: GET_USER,
        data: { user: userAuth },
      });
    });
    // componentWillUnmount()
    return () => unsubscribeFromAuth();
  }, [apolloClient]);

  // apollo cache
  const {
      data: { cartHidden },
    } = useQuery(GET_CART_HIDDEN),
    userQry = useQuery(GET_USER);

  // render
  return (
    <div>
      <Header hidden={cartHidden} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            userQry.data.user ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

export default App;
