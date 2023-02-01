import PropTypes from "prop-types";
import Task from "./Task";

function TaskList({ taskList, selectTask }) {
  const taskComponents = [];
  // const boardList = props.boardList;

  for (const task of taskList) {
    taskComponents.push(
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        startTime={task.startTime}
        endTime={task.endTime}
        numberOfPeople={task.numberOfPeople}
        particiName={task.particiName}
        selectTask={selectTask}
      />
    );
  }
  return (
    <div>
      <h2>Tasks</h2>
      <div className="scroll">
        <ol>{taskComponents}</ol>
      </div>
    </div>
  );
}

// TaskList.propTypes = {
//   taskList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       owner: PropTypes.string.isRequired,
//     })
//   ),
//   selectBoard: PropTypes.func.isRequired,
// };

export default TaskList;
