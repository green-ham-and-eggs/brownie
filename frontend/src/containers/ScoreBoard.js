import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { onError } from "../lib/errorLib";
import { API } from "aws-amplify";
import Badge from 'react-bootstrap/Badge'
import "./ScoreBoard.css";

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
        <ListGroup variant="numbered">{!isLoading && renderUsersList(users)}</ListGroup>
        
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
              <div>&#129351;</div>
              
              <span className="score_name">
                {user.name} &#x1f451;
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
        {
          (users.slice(1,2)).map(user => (
          
          <ListGroup.Item variant="warning">
            <div>&#129352;</div>
            <span className="score_name">
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
      {(users.slice(2,3)).map(user => (
          
          <ListGroup.Item variant="warning">
            <div>&#129353;</div>
            <span className="score_name">
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

      {(users.slice(3,users.length).map(user => (
          
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