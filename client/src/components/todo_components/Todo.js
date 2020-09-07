import React, { useState } from "react";
import { ReactComponent as Checkmark } from "../../assets/correct.svg";
import Popup from "./Popup";

import "./Todo.css";

export default function Todo(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);

  const RED = "#d35145";
  const GREEN = "#bad345";

  const date = new Date(props.dueDate);

  const viewTemplate = (
    <div key={props.index}>
      <div
        className="view-div-wrapper"
        onClick={() => {
          console.log(props.name);
          setName(props.name);
          setDescription(props.description);
          setOpen((o) => !o);
        }}
      >
        <div className="underline-div"></div>
        <div className="view-div">
          <Checkmark
            className="checkmark"
            fill={props.completed ? GREEN : RED}
          />
          <p className="task-title">{props.name}</p>
          {/* <p className="task-description">{props.description}</p> */}
          <p className="task-date">
            {date.toLocaleString(undefined, { month: "short", day: "numeric" })}
          </p>
          <Popup
            index={props.index}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            completed={props.completed}
            dueDate={props.dueDate}
            userId={props.userId}
            open={open}
            setOpen={setOpen}
            getTasks={props.getTasks}
            action={"edit"}
          />
        </div>
      </div>
    </div>
  );

  return viewTemplate;
}
