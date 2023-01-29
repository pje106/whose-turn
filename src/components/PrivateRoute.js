import React from "react";

import {  Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Redirect to="/login" />;
};
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return currentUser ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         );
//       }}
//     ></Route>
//   );
// }
