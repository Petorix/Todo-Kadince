import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as Checkmark } from "../../assets/correct.svg";

import "./Todo.css";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);

  // Track old name in case they cancel
  const [oldName, setOldName] = useState(props.name);
  const [oldDescription, setOldDescription] = useState(props.description);
  const [oldIsCompleted, setOldCompleted] = useState(props.completed);

  // Track new name in case they save
  const [newName, setNewName] = useState(props.name);
  const [newDescription, setNewDescription] = useState(props.description);
  const [isCompleted, setCompleted] = useState(props.completed);

  const RED = "#d35145";
  const GREEN = "#bad345";

  function submit(event) {
    setOldName(newName);
    setOldDescription(newDescription);
    setOldCompleted(isCompleted);

    axios({
      url: "/api/update",
      method: "POST",
      data: {
        _id: props.index,
        name: newName,
        description: newDescription,
        completed: isCompleted,
        userId: props.userId,
      },
    })
      .then(() => {
        props.getTasks();
      })
      .catch((e) => {
        console.log("Error sending data: ", e);
      });

    setEditing(false);
  }

  function deleteTask(event) {
    axios({
      url: "/api/delete",
      method: "POST",
      data: {
        _id: props.index,
        name: newName,
        description: newDescription,
        completed: isCompleted,
        userId: props.userId,
      },
    })
      .then(() => {
        props.getTasks();
      })
      .catch((e) => {
        console.log("Error sending data: ", e);
      });

    return null;
  }

  function cancelEdit(event) {
    // Reset values back to how they were
    setNewName(oldName);
    setNewDescription(oldDescription);
    setCompleted(oldIsCompleted);

    setEditing(false);
  }

  const viewTemplate = (
    <div key={props.index}>
      <div className="view-div-wrapper">
        <div className="view-div">
          <Checkmark fill={props.completed ? GREEN : RED} />
          <h5>{props.name}</h5>
          <p>{props.description}</p>
          <button>Edit</button>
        </div>
      </div>
      <div className="underline-div"></div>
    </div>
  );
  // const editTemplate = (
  //   <form onSubmit={submit} className="edit-form">
  //     <div className="edit-form-wrapper" key={props.index}>
  //       <div className="edit-form-div">
  //         <Checkmark fill={props.completed ? GREEN : RED} />
  //       </div>
  //       <div className="edit-form-div">
  //         <input
  //           type="text"
  //           name="name"
  //           placeholder="TODO Name"
  //           value={props.name}
  //           onChange={({ target }) => {
  //             const { value } = target;
  //             setNewName(value);
  //           }}
  //         />
  //       </div>
  //       <div className="edit-form-div">
  //         <textarea
  //           name="description"
  //           cols="30"
  //           rows="10"
  //           placeholder="Task description"
  //           value={newDescription}
  //           onChange={({ target }) => {
  //             const { value } = target;
  //             setNewDescription(value);
  //           }}
  //         />
  //       </div>
  //       <div className="edit-form-div">
  //         <p>{isCompleted ? "Completed" : "Pending"}</p>
  //         <p
  //           onClick={({ target }) => {
  //             setCompleted(!isCompleted);
  //           }}
  //         >
  //           {isCompleted ? "mark as pending" : "complete task"}
  //         </p>
  //       </div>
  //     </div>
  //     <button>Save</button>
  //     <button onClick={cancelEdit}>Cancel</button>
  //     <button onClick={deleteTask}>Delete</button>
  //   </form>
  // );

  return viewTemplate;
}
