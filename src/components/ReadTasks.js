import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiPen } from "react-icons/ti";
import TaskForm from "./TaskForm";
import { doc, deleteDoc } from "firebase/firestore";

function ReadTasks(updateTodo, task) {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newTasks, setNewTasks] = useState(task.text);

  // the useEffect hook is used to listen for changes in the tasks collection in the Firebase database. Whenever the collection is updated, the onSnapshot method is triggered, which updates the state of the tasks array. The input form allows users to add new tasks to the collection, and the updated tasks are displayed in the UI.
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "tasks"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const taskArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskArray);
      }
    );
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

  const onDeleteClick = async (task) => {
    const ok = window.confirm("Are you sure you want to delete this task?");
    console.log(ok);
    if (ok) {
      try {
        await deleteDoc(doc(db, "tasks", task.id));
      } catch (error) {
        console.log("Error deleting task: ", error);
      }
    }
  };

  const troggleEditing = () => setEditing((prev) => !prev);

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
          //.filter((task) => task.creatorId === currentUser.uid)
          .map((task) => {
            return (
              <div>
                <div className="todo-row" key={task.id}>
                  <div>{new Date(task.createdAt).toLocaleDateString()}</div>
                  <div>{task.text}</div>
                  <div className="img-wrapper">
                    {task.fileURL && (
                      <img
                        className="hover-zoom"
                        src={task.fileURL}
                        alt="postImg"
                      />
                    )}
                  </div>
                  <div>by {task.name}</div>
                  <div className="icons">
                    {/* <button onClick={() => onDeleteClick(task)}>Delete</button> */}
                    {/* <button onClick={troggleEditing}>Edit</button> */}
                    <TiPen onClick={troggleEditing} className="edit-icon" />
                    <MdOutlineDeleteOutline
                      onClick={() => onDeleteClick(task)}
                      className="delete-icon"
                    />
                  </div>
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
