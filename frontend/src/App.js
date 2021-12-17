import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand className="font-weight-bold text-muted">
          Brownie
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="/users">Team</Nav.Link>
            <Nav.Link href="/scoreboard">ScoreBoard</Nav.Link>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;