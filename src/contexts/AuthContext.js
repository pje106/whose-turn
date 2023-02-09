import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

// const AuthContext = React.createContext();
const AuthContext = createContext();
export { AuthContext };
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // function signup(email, password) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }

  async function signup(email, password, displayName) {
    if (displayName.length === 0) {
      alert("name cannot be empty");
    } else {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(`User ${user.uid} created`);
      await updateProfile(user, {
        displayName: displayName,
      });
      console.log("User profile updated");
    }
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

  function emailChange(email) {
    return updateEmail(currentUser, email);
  }

  function passwordChange(password) {
    return updatePassword(currentUser, password);
  }

  // const [userObj, setUserObj] = useState(null);
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setLoading(true);
  //       setUserObj(user);
  //     } else {
  //       setLoading(false);
  //     }
  //     return unsubscribe;
  //   });
  // }, []);
  // const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // setUserObj(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

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
