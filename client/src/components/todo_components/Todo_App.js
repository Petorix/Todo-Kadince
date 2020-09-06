import React, { Component } from "react";
import axios from "axios";

import TodoList from "./TodoList";
import Filter from "./Filters";
import Header from "./Header";
import Popup from "./Popup";
import Button from "react-bootstrap/Button";

import "./Todo_App.css";

export default class Todo_App extends Component {
  state = {
    tasks: [],
    filter: "All",
    open: false,
  };

  setOpen = (value) => {
    this.setState({ open: value });
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

  render() {
    return (
      <div>
        <Header />
        <div id="main-content-wrapper">
          <div id="add-task-button-wrapper">
            <Button
              id="add-task-button"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              Add Task
            </Button>
            <Filter setFilter={this.setFilter} />
          </div>
          <Popup
            open={this.state.open}
            setOpen={this.setOpen}
            action={"new"}
            getTasks={this.getTasks}
            setDescription={() => {
              return;
            }}
            setName={() => {
              return;
            }}
          />
          <TodoList
            getTasks={this.getTasks}
            tasks={this.state.tasks.filter(this.filter_map[this.state.filter])}
          />
        </div>
      </div>
    );
  }
}
