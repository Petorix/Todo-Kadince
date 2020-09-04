import React from "react";
import Todo from "./Todo";

export default function TodoList(props) {
  if (!props.tasks.length) return null;
  return props.tasks.map((task, index) => (
    <Todo
      name={task.name}
      completed={task.completed}
      index={task._id}
      key={index}
    />
  ));
}
