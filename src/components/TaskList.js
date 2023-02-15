import React, { useState } from "react";
import TaskForm from "./TaskForm";
import ReadTasks from "./ReadTasks";
import { useAuth } from "../contexts/AuthContext";

function TaskList() {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  const addTodo = (todo) => {
    if (todo.text.length === 0) {
      window.alert("Please enter a value for the todo item.");
    }
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  return (
    <>
      <div className="form-container">
        <h4>
          Welcome! <strong>{currentUser.displayName}</strong>
        </h4>
        <TaskForm onSubmit={addTodo} />
      </div>
      <ReadTasks />
    </>
  );
}

export default TaskList;
