import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../lib/errorLib";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';
import LoaderButton from "../components/LoaderButton";
import "./History.css";

export default function History() {
  const [users, setUsers] = useState([]);
  //const [datas, setDatas] = useState([]);
  
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

  async function onChange(id) {
    try {
    let points = await sendPoint(id);
    const datas = await loadUsers();
        setUsers([...datas]);
    } catch (e) {
      onError(e);
    }
    setIsLoading(false);
  }

  function loadUsers() {
    return API.get("brownie", "/history");
  }
  function renderUsers() {
    return (
      <div className="users">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Presentation History</h2>
        <ListGroup variant="flush">{!isLoading && renderPresentationHistory(users)}</ListGroup>
      </div>
    );
  }

  function sendPoint(id){
    return API.post("brownie", `/history/${id}`);
    
  }

  function renderPresentationHistory(users) {
    users.sort((a,b) => {
      return b.presentationDate - a.presentationDate;
    });

    return (
      <>
        {(users.slice(0,3)).map(user=> (
          
            <ListGroup.Item>
                <ListGroup horizontal >
                <ListGroup.Item variant="none">
                    <div class="name">
              <span className="font-weight-bold" >
                {user.name}
              </span> </div>
              <span className="text-muted">
                {(new Date(user.presentationDate)).toLocaleString()}
              </span>
              <br />
              <div class="size">
              <span>
              
              <LoaderButton isLoading={isLoading} variant="warning" onClick={() => onChange(user.presentationId)}>
                Points <Badge>+1</Badge>
                
            </LoaderButton>
              </span></div>
              </ListGroup.Item>
              <ListGroup.Item variant="secondary">
              <div class="name">
                  <span className="font-weight-bold">
                  Points
                  </span> </div>
                  <br />
                  <div class="align">
                  <span><Badge variant="none" style={{fontSize: 18}}>
                  {user.score} 
                  </Badge> 
                  </span>
                  </div>
              </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
            
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