import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./Filters.css";

export default function Filters(props) {
  const [isAll, setAll] = useState(true);
  const [isPending, setPending] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [newTitle, setTitle] = useState("Filter tasks");

  function handleClick(name) {
    setAll(false);
    setPending(false);
    setCompleted(false);

    setTitle(name);
    props.setFilter(name);
  }

  const dropdown = (
    <DropdownButton id="dropdown-basic-button" title={newTitle}>
      <Dropdown.Item
        name="All"
        onClick={({ target }) => {
          handleClick(target.name);
          setAll(true);
        }}
        active={isAll}
      >
        All
      </Dropdown.Item>

      <Dropdown.Item
        name="Pending"
        onClick={({ target }) => {
          handleClick(target.name);
          setPending(true);
        }}
        active={isPending}
      >
        Pending
      </Dropdown.Item>

      <Dropdown.Item
        name="Completed"
        onClick={({ target }) => {
          handleClick(target.name);
          setCompleted(true);
        }}
        active={isCompleted}
      >
        Completed
      </Dropdown.Item>
    </DropdownButton>
  );
  return dropdown;
}
