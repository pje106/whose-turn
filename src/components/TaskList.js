// import PropTypes from "prop-types";
// import Task from "./Task";

// function TaskList({ taskList, selectTask }) {
//   const taskComponents = [];
//   // const boardList = props.boardList;

//   for (const task of taskList) {
//     taskComponents.push(
//       <Task
//         key={task.id}
//         id={task.id}
//         title={task.title}
//         startTime={task.startTime}
//         endTime={task.endTime}
//         numberOfPeople={task.numberOfPeople}
//         particiName={task.particiName}
//         selectTask={selectTask}
//       />
//     );
//   }
//   return (
//     <div>
//       <h2>Tasks</h2>
//       <div className="scroll">
//         <ol>{taskComponents}</ol>
//       </div>
//     </div>
//   );
// }

// // TaskList.propTypes = {
// //   taskList: PropTypes.arrayOf(
// //     PropTypes.shape({
// //       id: PropTypes.number.isRequired,
// //       title: PropTypes.string.isRequired,
// //       owner: PropTypes.string.isRequired,
// //     })
// //   ),
// //   selectBoard: PropTypes.func.isRequired,
// // };

// export default TaskList;

import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";

function TaskList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // even the user enter lot of spaces there, will still display
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

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
      <h4>Plan Start From Today!</h4>
      <TaskForm onSubmit={addTodo} />
      <Task
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TaskList;
