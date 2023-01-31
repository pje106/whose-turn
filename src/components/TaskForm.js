import { useState } from "react";
import PropTypes from "prop-types";

/* 
title
owner's name 
preview: title - owner's name 
submit button 
hide new board form button 
*/

const INITIAL_FORM_DATA = {
  title: "",
  owner: "",
};

const NewBoardForm = ({ addBoardCallbackFunc }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    console.log("handle change called");

    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    console.log(newFormData);
    setFormData(newFormData);
  };

  const handleNewBoardSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    addBoardCallbackFunc(formData);
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="owner">
          Owner's Name:
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="owner">
          Add participant:
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="owner">
          Pick Date:
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          ></input>
        </label>
        <p>
          Preview: {formData.title} {formData.title && "-"} {formData.owner}
        </p>
        <input
          type="submit"
          value="Submit"
          onClick={handleNewBoardSubmit}
          disabled={!formData.title || !formData.owner}
        />
      </form>
    </div>
  );
};

NewBoardForm.propTypes = {
  addBoardCallbackFunc: PropTypes.func.isRequired,
};
export default NewBoardForm;
