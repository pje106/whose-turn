import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// export default function PrivateRoute({ children }) {
//   const { currentUser } = useAuth();
//   return currentUser ? children : <Redirect to="/login" />;
//   const auth = useAuth();
//   return auth ? children : <Redirect to="/login" />;

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      ></Route>
    </>
  );
}
