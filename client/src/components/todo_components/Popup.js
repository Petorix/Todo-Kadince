import React, { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Stylesheets
import "reactjs-popup/dist/index.css";
import "./Popup.css";

export default function CustomPopup(props) {
  const newTask = {
    name: "New Task",
    description: "",
    completed: false,
    dueDate: new Date(),
    userId: "CHANGETHIS",
  };

  const [newName, setNewName] = useState(newTask.name);
  const [newDescription, setNewDescription] = useState(newTask.description);
  const [newDate, setDate] = useState(
    props.action === "edit" ? props.dueDate : newTask.dueDate
  );

  var isCompleted =
    props.action === "edit" ? props.completed : newTask.completed;

  function closeModal() {
    if (props.action === "edit") {
      setNewName(props.name);
      setNewDescription(props.description);
    }
    props.setOpen(false);
  }

  function addTask(event) {
    event.preventDefault();
    axios({
      url: "/api/save",
      method: "POST",
      data: {
        name: newName,
        description: newDescription,
        completed: isCompleted,
        dueDate: newDate,
        userId: props.userId,
      },
    })
      .then(() => {
        props.setOpen(false);
        props.getTasks();
      })
      .catch((e) => {
        console.log("Error sending data: ", e);
      });
  }

  function updateTask(event) {
    event.preventDefault();

    console.log(newName);

    axios({
      url: "/api/update",
      method: "POST",
      data: {
        _id: props.index,
        name: props.name,
        description: props.description,
        completed: isCompleted,
        dueDate: newDate,
        userId: props.userId,
      },
    })
      .then(() => {
        props.setOpen(false);
        props.getTasks();
      })
      .catch((e) => {
        console.log("Error sending data: ", e);
      });
  }

  function deleteTask(event) {
    event.preventDefault();

    axios({
      url: "/api/delete",
      method: "POST",
      data: {
        _id: props.index,
        name: props.name,
        description: props.description,
        completed: isCompleted,
        dueDate: newDate,
        userId: props.userId,
      },
    })
      .then(() => {
        props.setOpen(false);
        props.getTasks();
      })
      .catch((e) => {
        console.log("Error sending data: ", e);
      });

    return null;
  }

  return (
    <Popup open={props.open} onClose={closeModal} modal position="right center">
      <div className="flex-wrapper">
        {props.action === "edit" ? (
          <div className="push-right">
            <Button
              id="complete-button"
              onClick={(event) => {
                isCompleted = !isCompleted;
                updateTask(event);
              }}
            >
              {!isCompleted ? "Mark as complete" : "Mark as incomplete"}{" "}
            </Button>
          </div>
        ) : null}
      </div>

      <Form className="edit-form">
        <Form.Group controlId="taskForm.ControlInput1">
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="New Task"
            name="name"
            value={props.name}
            onChange={({ target }) => {
              setNewName(target.value);
              props.setName(target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="taskForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="8"
            name="description"
            placeholder="Task description"
            value={props.description}
            onChange={({ target }) => {
              setNewDescription(target.value);
              props.setDescription(target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="taskForm.ControlTextarea1">
          <Form.Label>Due date</Form.Label>
          <DatePicker
            selected={Date.parse(newDate)}
            onChange={(date) => {
              setDate(date);
            }}
          />
        </Form.Group>
      </Form>
      <div className="flex-wrapper">
        <div className="push-right">
          <Button
            className="bottom-button"
            onClick={props.action === "edit" ? updateTask : addTask}
          >
            Save
          </Button>
          <Button className="bottom-button" onClick={closeModal}>
            Cancel
          </Button>
          {/* I won't need this due to closeModal being called when user clicks outside of modal.
            I'll leave it just in case.
          <button onClick={closeModal}>Cancel</button> */}
          {props.action === "edit" ? (
            <Button className="bottom-button" onClick={deleteTask}>
              Delete
            </Button>
          ) : null}
        </div>
      </div>
    </Popup>
  );
}
