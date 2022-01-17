import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";

import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare } from "react-icons/bs";
import LoaderButton from "../components/LoaderButton";
import Form from "react-bootstrap/Form";

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const user = await API.get("brownie", `/users/${id}`);

        setUser(user);
        if (user.interest){
          setInterests(user.interest);
        }
        
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function loadUser() {
    return API.get("brownie", `/users/${id}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await addInterest({interest: newInterest});
      const user = await loadUser();
     
      setUser(user);
      if (user.interest){
        setInterests(user.interest);
      }
      setIsLoading(false);
      setNewInterest("");
      setIsAddingInterest(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function addInterest(interest) {
    return API.put("brownie", `/users/${user.userId}/interest`, {
      body: interest
    });
  } 

  function deleteNote() {
    return API.del("brownie", `/users/${user.userId}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteNote();
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  function newInterestForm(){
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Control
          value={newInterest}
          placeholder="Enter new interest"
          onChange={(e) => setNewInterest(e.target.value)}
        />

        <LoaderButton 
          variant="primary"
          size="lg"
          block
          isLoading={isLoading}
          disabled={false}
          type="submit"
        >
          Save
        </LoaderButton>
      </Form>
    )
  }

  function newInterestButton(){
    return (
      <ListGroup.Item action onClick={() => setIsAddingInterest(true)} className="py-3 text-nowrap text-truncate">
        <BsPencilSquare size={15} />
        <span className="ml-2 font-weight-bold">Add a new interest</span>
      </ListGroup.Item>
    )
  }

  return (
    <div className="Users">
      {user && (
        <h3 className="pb-3 mt-4 mb-3 border-bottom">
          {user.name}
        </h3>
      )}
      {interests.map((interest, index) => (
        <ListGroup.Item key={index}>
          <span className="font-weight-thin">
            {interest}
          </span>
          <br />
        </ListGroup.Item>
      ))}
      {isAddingInterest ? newInterestForm() : newInterestButton()}
      {<br />}
      {
        <LoaderButton
        block
        size="lg"
        variant="danger"
        onClick={handleDelete}
        isLoading={isDeleting}
      >
        Delete User
      </LoaderButton>
      }
    </div>
  );
}