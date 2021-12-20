import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../lib/errorLib";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import Badge from 'react-bootstrap/Badge'

export default function ScoreBoard() {
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
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your ScoreBoard</h2>
        <ListGroup>{!isLoading && renderUsersList(users)}</ListGroup>
        
      </div>
    );
  }
  function renderUsersList(users) {
    users.sort((a,b) => {
      return b.score - a.score;
    });

    return (
      <>
        {(users.slice(0,1)).map(user => (
          
            <ListGroup.Item variant="warning">
              <div>&#x1f451;</div>
              <span className="font-weight-bold">
                {user.name}
              </span>
              
              <br />
              {
              <span className="text-muted">
                Points:{' '} 
              </span>}
              <Badge variant="dark" pill>
              {' '}{(user.score)}{' '}
            </Badge>
            </ListGroup.Item>
        ))
        }
        {(users.slice(1,3)).map(user => (
          
          <ListGroup.Item variant="warning">
            <span className="font-weight-bold">
              {user.name}
            </span>
            <br />
            {
            <span className="text-muted">
              Points:{' '} 
            </span>}
            <Badge variant="dark" pill>
            {' '}{(user.score)}{' '}
          </Badge>
          </ListGroup.Item>
      ))
      }

      {(users.slice(-((users.length)-3)).map(user => (
          
          <ListGroup.Item>
            <span className="font-weight-bold">
              {user.name}
            </span>
            <br />
            {
            <span className="text-muted">
              Points:{' '}
            </span>}
            <Badge variant="dark" pill>
              {' '}{(user.score)}{' '}
            </Badge>
          </ListGroup.Item>
      )))}
      </>
    );
  }

  return (
    <div>
      {renderUsers()}
    </div>
  );
}