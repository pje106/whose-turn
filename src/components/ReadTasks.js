import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
// import { addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import {
//   MdOutlineDeleteOutline,
//   MdOutlinePlaylistAddCheck,
// } from "react-icons/md";
// import { TiPen } from "react-icons/ti";
// import TaskForm from "./TaskForm";
// import Task from "./Task";

function ReadTasks({ completeTodo, removeTodo, updateTodo }) {
  const [tasks, setTasks] = useState([]);
  const usersCollectionRef = collection(db, "tasks");
  const { currentUser } = useAuth();

  //   const createTask = async () => {
  //     await addDoc(usersCollectionRef, { name: newTask });
  //   };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>ToDo Tasks</h3>
      <div className="list-contain">
        {tasks.map((task) => {
          return (
            <div className="todo-row" key={task.id}>
              <div>{task.text}</div>
              {/* <div>by {currentUser.displayName}</div> */}
              <div>{new Date(task.createdAt).toLocaleDateString()}</div>
            </div>
            //new Date(task.createdAt).toUTCString()
          );
        })}
      </div>
    </>
  );
}
export default ReadTasks;
