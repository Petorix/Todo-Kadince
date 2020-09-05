import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import TodoApp from "./components/todo_components/Todo_App";
import Error from "./components/error_components/Error";
import "./App.css";

// Set up with routes just in case more 'pages' needed to be added
export default class App extends Component {
  render() {
    return (
      <div id="root-div">
        <Switch>
          <Route exact={true} path="/" component={TodoApp} />
          <Route path="/:id" component={Error} />
        </Switch>
      </div>
    );
  }
}
