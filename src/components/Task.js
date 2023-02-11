import React, { useState } from "react";
import TaskForm from "./TaskForm";
// import {
//   MdOutlineDeleteOutline,
//   MdOutlinePlaylistAddCheck,
// } from "react-icons/md";
// import { TiPen } from "react-icons/ti";

const Task = ({ todos, completeTodo, removeTodo, updateTodo }) => {
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

  return todos.map((todo, index) => (
    <>
      <div
        className={
          todo.isComplete ? "todo-row-plain complete" : "todo-row-plain"
        }
        key={index}
      >
        {/* <div key={todo.id}>{todo.text}</div> */}
        {/* <div>{todo.id}</div> */}
        {/* <div className="icons">
          <MdOutlinePlaylistAddCheck
            onClick={() => completeTodo(todo.id)}
            className="complete-icon"
          />
          <TiPen
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="edit-icon"
          />
          <MdOutlineDeleteOutline
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
        </div> */}
      </div>
    </>
  ));
};

export default Task;
