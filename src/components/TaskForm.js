import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  // query,
  // getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

function TaskForm(props) {
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState([]);
  const { currentUser } = useAuth();
  const inputRef = useRef(null);

  // const getTasks = async () => {
  //   const q = query(collection(db, "tasks").orderBy("createdAt", "desc"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const taskObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setInputs((prev) => [taskObj, ...prev]);
  //     console.log(taskObj);
  //   });
  // };

  useEffect(() => {
    // getTasks();
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInputs(taskArray);
    });
    return unsub;
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    await addDoc(collection(db, "tasks"), {
      text: input,
      creatorId: currentUser.uid,
      //createdAt: serverTimestamp(),
      createdAt: Date.now(), //only this one can convert to date in ReadTasks
    });
    setInput("");
  };

  console.log(inputs);
  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        {props.edit ? (
          <>
            <input
              placeholder="Update your item"
              value={input}
              onChange={handleChange}
              name="text"
              ref={inputRef}
              className="todo-input edit"
            />
            <button onClick={handleSubmit} className="todo-button edit">
              Update
            </button>
          </>
        ) : (
          <>
            <input
              placeholder="Add a todo"
              value={input}
              onChange={handleChange}
              name="text"
              className="todo-input"
              ref={inputRef}
            />
            <button onClick={handleSubmit} className="todo-button">
              Add ToDo
            </button>
          </>
        )}
      </form>
    </>
  );
}

export default TaskForm;
