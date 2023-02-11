import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  MdOutlineDeleteOutline,
  MdOutlinePlaylistAddCheck,
} from "react-icons/md";
import { TiPen } from "react-icons/ti";
import TaskForm from "./TaskForm";
import { useAuth } from "../contexts/AuthContext";

function ReadTasks(todos, completeTodo, removeTodo, updateTodo, fileURL) {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  // the useEffect hook is used to listen for changes in the tasks collection in the Firebase database. Whenever the collection is updated, the onSnapshot method is triggered, which updates the state of the tasks array. The input form allows users to add new tasks to the collection, and the updated tasks are displayed in the UI.
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskArray);
    });
    return unsub;
  }, []);

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };
  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <>
      {/* <h3 style={{ textAlign: "center" }}>ToDo List</h3> */}
      <div className="list-contain">
        {/* using filter method only read the data length greater than 0 */}
        {tasks
          // .filter((task) => task.text.trim().length > 0)
          // .filter((task) => task.creatorId === currentUser.uid)
          // .filter(
          //   (task) =>
          //     typeof task === "object" &&
          //     typeof task.text === "string" &&
          //     task.text.trim().length > 0
          // )
          .filter((task) => task.creatorId === currentUser.uid)
          .map((task) => {
            return (
              <div className="todo-row" key={task.id}>
                <div>{task.text}</div>
                {task.fileURL && <img src={task.fileURL} width="50px" alt="" />}
                <div>by {task.name}</div>
                {/* <div>{new Date(task.createdAt).toLocaleDateString()}</div> */}
                <div className="icons">
                  <MdOutlinePlaylistAddCheck
                    onClick={() => completeTodo(task.id)}
                    className="complete-icon"
                  />
                  <TiPen
                    onClick={() => setEdit({ id: task.id, value: task.text })}
                    className="edit-icon"
                  />
                  <MdOutlineDeleteOutline
                    onClick={() => removeTodo(task.id)}
                    className="delete-icon"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
//new Date(task.createdAt).toUTCString()
export default ReadTasks;
