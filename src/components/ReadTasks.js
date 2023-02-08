import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// import { addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import {
//   MdOutlineDeleteOutline,
//   MdOutlinePlaylistAddCheck,
// } from "react-icons/md";
// import { TiPen } from "react-icons/ti";
// import TaskForm from "./TaskForm";
// import Task from "./Task";

function ReadTasks({ completeTodo, removeTodo, updateTodo }) {
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

  // const [edit, setEdit] = useState({
  //   id: null,
  //   input: "",
  // });

  // const submitUpdate = (input) => {
  //   updateTodo(edit.id, input);
  //   setEdit({
  //     id: null,
  //     input: "",
  //   });
  // };

  // if (edit.id) {
  //   return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  // }

  return (
    <>
      <div className="list-contain">
        {users.map((user) => {
          return <div className="todo-row"> Tasks: {user.input}</div>;
        })}
      </div>
    </>
  );
}
export default ReadTasks;
