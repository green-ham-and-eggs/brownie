import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate as useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../lib/errorLib";

import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare } from "react-icons/bs";
import LoaderButton from "../components/LoaderButton";
import { LinkContainer } from "react-router-bootstrap";
import Form from "react-bootstrap/Form";
import config from "../config";

export default function User() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [newInterest, setNewInterest] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadUser() {
      return API.get("brownie", `/users/${id}`);
    }

    async function onLoad() {
      try {
        const user = await loadUser();

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

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await addInterest(newInterest);
      history(`/team/${user.userId}`);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function addInterest(newInterest) {
    const interestParam = {interest: newInterest}
    return API.put("brownie", `/users/${user.userId}/interest`, {
      body: interestParam
    });
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
    <div>
    </div>
  );
}