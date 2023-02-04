// import { useRef, useState } from "react";
// import PropTypes from "prop-types";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// // import Calendar from "./Calendar";

// /*
// title
// owner's name
// preview: title - owner's name
// submit button
// hide new board form button
// */

// const INITIAL_FORM_DATA = {
//   title: "",
//   owner: "",
// };

// const TaskForm = ({ addTaskCallbackFunc }) => {
//   const [formData, setFormData] = useState(INITIAL_FORM_DATA);

//   const titleRef = useRef();
//   const tiemRangeRef = useRef();
//   const descriptionRef = useRef();
//   const [loading, setLoading] = useState(false);

//   // const handleChange = (e) => {
//   //   console.log("handle change called");

//   //   const newFormData = {
//   //     ...formData,
//   //     [e.target.name]: e.target.value,
//   //   };

//   //   console.log(newFormData);
//   //   setFormData(newFormData);
//   // };

//   const handleNewTaskSubmit = (e) => {
//     e.preventDefault();
//     console.log(e);
//     addTaskCallbackFunc(formData);
//   };

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4"> Add New Task </h2>
//           <Form onSubmit={handleNewTaskSubmit}>
//             <Form.Group id="title">
//               <Form.Label>Title</Form.Label>
//               <Form.Control type="title" ref={titleRef} required />
//             </Form.Group>

//             <Form.Group id="description">
//               <Form.Label>Description</Form.Label>
//               <Form.Control type="description" ref={descriptionRef} required />
//             </Form.Group>

//             <Form.Group id="startTime">
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control type="date" ref={tiemRangeRef} required />
//             </Form.Group>

//             <Form.Group id="endTime">
//               <Form.Label>End Date</Form.Label>
//               <Form.Control type="date" ref={tiemRangeRef} required />
//             </Form.Group>

//             {/* <Form.Group id="numberOfPeople">
//               <Form.Label>Number of People Participant</Form.Label>
//               <Form.Control
//                 input
//                 type="number"
//                 min="0"
//                 max="5"
//                 ref={numOfPerpleRef}
//                 required
//               />
//             </Form.Group> */}

//             <Button disabled={loading} className="w-100 mt-2" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       {/* <div className="w-100 text-center mt-2">
//         Already have an account? <Link to="/login">Log In</Link>
//       </div> */}
//     </>

//     // <div>
//     //   <h3>Add New Task</h3>
//     //   <form>
//     //     <label htmlFor="title">
//     //       Title:
//     //       <input
//     //         type="text"
//     //         id="title"
//     //         name="title"
//     //         value={formData.title}
//     //         onChange={handleChange}
//     //       ></input>
//     //     </label>
//     //     <label htmlFor="owner">
//     //       Owner:
//     //       <input
//     //         type="text"
//     //         id="owner"
//     //         name="owner"
//     //         value={formData.owner}
//     //         onChange={handleChange}
//     //       ></input>
//     //     </label>
//     //     <label htmlFor="part">
//     //       Participant:
//     //       <input
//     //         type="text"
//     //         id="part"
//     //         name="part"
//     //         value={formData.part}
//     //         onChange={handleChange}
//     //       ></input>
//     //     </label>
//     //     <label htmlFor="date">
//     //       Start date:
//     //       <input
//     //         type=""
//     //         id="date"
//     //         name="date"
//     //         value={formData.date}
//     //         onChange={handleChange}
//     //       ></input>
//     //     </label>
//     //     <p>
//     //       Preview: {formData.title} {formData.title && "-"} {formData.owner}{" "}
//     //       {formData.part} - {formData.date}
//     //     </p>
//     //     <input
//     //       type="submit"
//     //       value="Submit"
//     //       onClick={handleNewTaskSubmit}
//     //       disabled={!formData.title || !formData.owner}
//     //     />
//     //   </form>
//     // </div>
//   );
// };

// // TaskForm.propTypes = {
// //   addTaskCallbackFunc: PropTypes.func.isRequired,
// // };

// export default TaskForm;

import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function TaskForm(props) {
  //const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  // const handleChange = (e) => {
  //   setInput(e.target.value);
  // };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    await addDoc(collection(db, "tasks"), {
      input,
      createdAt: Date.now(),
    });
    setInput("");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  // props.onSubmit({
  //   id: Math.floor(Math.random() * 10000),
  //   text: input,
  // });
  //   const onSubmit = async (event) => {
  //     event.preventDefault();
  //     await addDoc(collection(dbService, "nweets"), {
  //     nweet,
  //     createdAt: Date.now(),
  //     });

  //   setInput("");
  // };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add ToDo
          </button>
        </>
      )}
    </form>
  );
}

export default TaskForm;
