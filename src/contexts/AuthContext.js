import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // onAuthStateChanged,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";

// const AuthContext = React.createContext();
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();
//   const [loading, setLoading] = useState(true);

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email);
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password);
  // }

  function emailChange(email) {
    return updateEmail(currentUser, email);
  }

  function passwordChange(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // const value = {
  //   currentUser,
  //   login,
  //   signup,
  //   logout,
  //   resetPassword,
  //   updateEmail,
  //   updatePassword,
  // };
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    emailChange,
    passwordChange,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
