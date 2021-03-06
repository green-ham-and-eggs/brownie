import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import logo from './favicon-32x32.png';

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
          <img
      src={logo}
      width="30"
      height="30"
      alt="brownie logo"
    />
            Brownie
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/team">
              <Nav.Link>Team</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/scoreboard">
              <Nav.Link>ScoreBoard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/history">
              <Nav.Link>History</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;