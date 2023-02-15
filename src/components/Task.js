import React, { useState } from "react";
import TaskForm from "./TaskForm";

const Task = ({ todos, updateTodo }) => {
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
      ></div>
    </>
  ));
};

export default Task;
