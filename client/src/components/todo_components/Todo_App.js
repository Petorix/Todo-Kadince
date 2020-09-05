import React, { Component } from "react";
import axios from "axios";

import TodoList from "./TodoList";
import Filter from "./Filters";
import Header from "./Header";
import Button from "react-bootstrap/Button";

import "./Todo_App.css";

export default class Todo_App extends Component {
  state = {
    tasks: [],
    filter: "All",
  };

  setFilter = (name) => {
    this.setState({ filter: name });
  };

  filter_map = {
    All: () => true,
    Pending: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  componentDidMount = () => {
    this.getTasks();
  };

  getTasks = () => {
    axios
      .get("/api")
      .then((res) => {
        const data = res.data;
        this.setState({ tasks: data });
      })
      .catch((e) => {
        console.log("Error fetching data: ", e);
      });
  };

  addTask = (event) => {
    axios({
      url: "/api/save",
      method: "POST",
      data: {
        name: "New Task",
        description: "",
        completed: false,
        userId: "changeThisToProp",
      },
    })
      .then(() => {
        this.getTasks();
      })
      .catch(() => {
        console.log("Error sending data.");
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div id="main-content-wrapper">
          <div id="add-task-button-wrapper">
            <Button id="add-task-button" onClick={this.addTask}>
              Add Task
            </Button>
            <Filter setFilter={this.setFilter} />
          </div>
          <TodoList
            getTasks={this.getTasks}
            tasks={this.state.tasks.filter(this.filter_map[this.state.filter])}
          />
        </div>
      </div>
    );
  }
}
