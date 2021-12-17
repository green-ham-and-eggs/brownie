import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { onError } from "../lib/errorLib";
import { API } from "aws-amplify";

export default function Team() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const users = await loadUsers();
        setUsers(users);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, []);
  
  function loadUsers() {
    return API.get("brownie", "/users");
  }

  function renderUsers() {
    return (
      <div className="users">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Team</h2>
        <ListGroup>{!isLoading && renderUsersList(users)}</ListGroup>
      </div>
    );
  }

  function renderUsersList(users) {
    return (
      <>{/*
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
      </LinkContainer>*/}
        {users.map(user => (
          <LinkContainer key={user.userId} to={`/users/${user.userId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {user.name}
              </span>
              <br />
              {/*
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>*/}
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  return (
    <div>
      {renderUsers()}
    </div>
  );

}