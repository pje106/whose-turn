import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// import { addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "tasks");

  //   const createTask = async () => {
  //     await addDoc(usersCollectionRef, { name: newTask });
  //   };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <>
      <div>
        {users.map((user) => {
          return (
            <div>
              {" "}
              <h3> Tasks: {user.input} </h3>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
