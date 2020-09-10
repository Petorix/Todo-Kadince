import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import "./Header.css";

export default function Header(props) {
  return (
    <Navbar>
      <Navbar.Brand>
        <div className="d-inline-block align-top">Peter Williams</div>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <p></p>
        <Navbar.Brand>My Tasks</Navbar.Brand>
      </Nav>
    </Navbar>
  );
}
