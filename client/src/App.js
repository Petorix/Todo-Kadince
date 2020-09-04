import React, { Component } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import Form from "./components/Form";

export default class App extends Component {
  state = {
    display: "",
    tasks: [],
  };

  componentDidMount = () => {
    this.getAllTasks();
  };

  getAllTasks = () => {
    this.setState({ display: "All" });

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

  getPendingTasks = () => {
    this.setState({ display: "Pending" });

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

  getCompletedTasks = () => {
    this.setState({ display: "Completed" });

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
        <h2>Welcome to TODO App</h2>
        <button onClick={this.getAllTasks}>All Tasks</button>
        <button onClick={this.getPendingTasks}>Pending Tasks</button>
        <button onClick={this.getCompletedTasks}>Completed Tasks</button>
        <Form />
        <TodoList tasks={this.state.tasks} />
      </div>
    );
  }
}
