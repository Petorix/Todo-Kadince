import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ReactComponent as Logo } from "./logo.svg";

import "./Header.css";

export default function Header(props) {
  return (
    <Navbar bg="light">
      <Navbar.Brand>
        <div className="d-inline-block align-top">
          <Logo />
        </div>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <p></p>
        <Navbar.Brand>My Tasks</Navbar.Brand>
      </Nav>
    </Navbar>
  );
}
