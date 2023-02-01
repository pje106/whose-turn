import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// import { db } from "./firebase";
// import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//console.log(db);

// async function readAllUsers() {
//   try {
//     // const collectionRef = collection(db, "users");
//     // const getPromise = collectionRef.get();
//     const snapshot = await db.collection("users").get();
//     // const snapshot = await getPromise;
//     console.log(`Found ${snapshot.size}x user.`);
//     console.log(snapshot.docs);
//   } catch (err) {
//     console.log(err);
//   }
// }
// readAllUsers();
