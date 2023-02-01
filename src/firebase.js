// import firebase from "firebase/app";

import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTO_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

// help us to debugging later:
// if (!initializeApp.apiKey)
//   throw new Error("missing firebase credential:apiKey");
// if (!initializeApp.authDomain)
//   throw new Error("missing firebase credential:authDomain");
// if (!initializeApp.projectId)
//   throw new Error("missing firebase credential:projectId");
// if (!initializeApp.storageBucket)
//   throw new Error("missing firebase credential:storageBucket");
// if (!initializeApp.messagingSenderId)
//   throw new Error("missing firebase credential:messagingSenderId");
// if (!initializeApp.appId) throw new Error("missing firebase credential:appId");

export const db = getFirestore(app);
// Initialize Firebase

export const auth = getAuth(app);
export default app;
