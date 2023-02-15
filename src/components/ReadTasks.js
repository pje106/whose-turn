import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiPen } from "react-icons/ti";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function ReadTasks() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newTasks, setNewTasks] = useState(tasks.text);
  const [editingTask, setEditingTask] = useState(null);

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

  const onDeleteClick = async (task) => {
    const ok = window.confirm("Are you sure you want to delete this task?");
    console.log(ok);
    if (ok) {
      try {
        const taskRef = doc(db, "tasks", task.id);
        await deleteDoc(taskRef);
      } catch (error) {
        console.log("Error deleting task: ", error);
      }
    }
  };

  const toggleEditing = (task) => {
    setEditingTask(task);
    setNewTasks(task.text);
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, "tasks", editingTask.id), {
      text: newTasks,
    });
    setEditing(false);
    setEditingTask(null);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTasks(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your message"
              value={newTasks}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update message" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <div className="list-contain">
          {tasks
            // .filter((task) => task.text.trim().length > 0)
            // .filter((task) => task.creatorId === currentUser.uid)
            //.filter((task) => task.creatorId === currentUser.uid)
            .map((task) => {
              return (
                <div className="todo-row" key={task.id}>
                  <div>
                    <strong>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </strong>
                  </div>
                  <div
                    style={{
                      fontFamily: "Comic Sans MS",
                      fontSize: "24px",
                      textdecoration: "underline",
                      maxWidth: "330px",
                    }}
                  >
                    {task.text}
                  </div>
                  <div className="img-wrapper">
                    {task.fileURL && (
                      <img
                        className="hover-zoom"
                        src={task.fileURL}
                        alt="postImg"
                      />
                    )}
                  </div>
                  <div style={{marginTop:"50px"}}>by {task.name}</div>
                  <div className="icons">
                    <TiPen
                      onClick={() => toggleEditing(task)}
                      className="edit-icon"
                    />
                    <MdOutlineDeleteOutline
                      onClick={() => onDeleteClick(task)}
                      className="delete-icon"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
export default ReadTasks;
