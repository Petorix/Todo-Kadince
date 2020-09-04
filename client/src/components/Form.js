import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  state = {
    name: "",
    completed: false,
  };

  submit = (event) => {
    axios({
      url: "/api/save",
      method: "POST",
      data: {
        name: this.state.name,
        completed: this.state.completed,
      },
    })
      .then(() => {
        this.resetInputs();
      })
      .catch(() => {
        console.log("Error sending data.");
      });
  };

  resetInputs = () => {
    this.setState({
      name: "",
      completed: false,
    });
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="form-input">
          <input
            type="text"
            name="name"
            placeholder="TODO Name"
            value={this.state.name}
            onChange={({ target }) => {
              const { name, value } = target;
              this.setState({
                [name]: value,
              });
            }}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="completed"
            className="form-input"
            checked={this.state.completed}
            onChange={({ target }) => {
              const { name, checked } = target;
              this.setState({
                [name]: checked,
              });
            }}
          />
          <label for="form-input">
            {" "}
            {this.state.completed ? "Completed" : "Pending"}
          </label>
        </div>
        <button>Add Task</button>
      </form>
    );
  }
}

export default Form;
