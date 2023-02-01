import PropTypes from "prop-types";

function Task(props) {
  const taskId = props.id;
  const taskTitle = props.title;
  const taskStartTime = props.startTime;
  const taskEndTime = props.endTime;
  const taskNumberOfPeople = props.numberOfPeople;
  const taskParticiName = props.particiName;
  const selectTask = props.selectTask;

  function onSelectTask() {
    selectTask(
      taskId,
      taskTitle,
      taskStartTime,
      taskEndTime,
      taskNumberOfPeople,
      taskParticiName
    );
  }

  return <li onClick={onSelectTask}>{taskTitle}</li>;
}

// Task.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   owner: PropTypes.string.isRequired,
//   selectTask: PropTypes.func.isRequired,
// };

export default Task;
