import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

function TaskForm(props) {
  //const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState([]);
  const inputRef = useRef(null);

  const getTasks = async () => {
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const taskObj = {
        ...doc.data(),
        id: doc.id,
      };

      setInputs((prev) => [taskObj, ...prev]);
      console.log(taskObj);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  });

  // const handleChange = (e) => {
  //   setInput(e.target.value);
  // };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  const { currentUser } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      return;
    }
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    await addDoc(collection(db, "tasks"), {
      text: input,
      createdAt: Date.now(),
      creatorId: currentUser.uid,
    });
    setInput("");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  // props.onSubmit({
  //   id: Math.floor(Math.random() * 10000),
  //   text: input,
  // });
  //   const onSubmit = async (event) => {
  //     event.preventDefault();
  //     await addDoc(collection(dbService, "nweets"), {
  //     nweet,
  //     createdAt: Date.now(),
  //     });

  //   setInput("");
  // };

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
