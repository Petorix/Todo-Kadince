import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  state = {
    name: "",
    description: "",
  };

  submit = (event) => {
    event.preventDefault();

    axios({
      url: "/api/save",
      method: "POST",
      data: {
        name: this.state.name ? this.state.name : "New Task",
        description: this.state.description,
        completed: false,
        userId: "changeThisToProp",
      },
    })
      .then(() => {
        this.resetInputs();
        this.props.getTasks();
      })
      .catch(() => {
        console.log("Error sending data.");
      });
  };

  resetInputs = () => {
    this.setState({
      name: "",
      description: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="add-form-div">
          <input
            type="text"
            name="name"
            placeholder="New Task"
            value={this.state.name}
            onChange={({ target }) => {
              const { name, value } = target;
              this.setState({
                [name]: value,
              });
            }}
          />
        </div>
        <div className="add-form-div">
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Task description"
            value={this.state.description}
            onChange={({ target }) => {
              const { name, value } = target;
              this.setState({
                [name]: value,
              });
            }}
          />
        </div>
        <button>Add Task</button>
      </form>
    );
  }
}

export default Form;
