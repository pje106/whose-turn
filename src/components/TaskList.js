import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import ReadTasks from "./ReadTasks";
//import { db } from "../firebase";
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
    //|| /^\s*$/.test(todo.text)
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="form-container">
        <h4>
          Welcome! <strong>{currentUser.displayName}</strong>
        </h4>
        <TaskForm onSubmit={addTodo} />
        {/* <Link style={{ textDecoration: "none" }} to="/tasks"> */}
      </div>

      <Task todos={todos} />
      <ReadTasks
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        // key={todos.id}
        // todoObj={todos}
        // isOwner={todos.creatorId === currentUser.uid}
      />
      {/* </Link> */}
    </>
  );
}

export default TaskList;
