import React, { useState } from "react";
import axios from "axios";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const [isCompleted, setCompleted] = useState(props.completed);

  function submit(event) {
    axios({
      url: "/api/update",
      method: "POST",
      data: {
        _id: props.index,
        name: newName,
        completed: isCompleted,
      },
    }).catch((e) => {
      console.log("Error sending data: ", e);
    });

    setEditing(false);
  }

  const viewTemplate = (
    <div key={props.index}>
      <h3>{newName}</h3>
      <p>{props.index}</p>
      <p>{isCompleted ? "Completed" : "Pending"}</p>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button>Delete</button>
    </div>
  );
  const editTemplate = (
    <form onSubmit={submit}>
      <div key={props.index}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="TODO Name"
            value={newName}
            onChange={({ target }) => {
              const { value } = target;
              setNewName(value);
            }}
          />
        </div>
        <div>
          <p>{props.index}</p>
        </div>
        <div>
          <input
            type="checkbox"
            name="completed"
            className="form-input"
            checked={isCompleted}
            onChange={({ target }) => {
              const { value } = target;
              setCompleted(value);
            }}
          />
          <label for="form-input">
            {isCompleted ? "Completed" : "Pending"}
          </label>
        </div>
      </div>
      <button>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </form>
  );
  return isEditing ? editTemplate : viewTemplate;
}
