import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate as useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
import config from "../config";
import { API } from "aws-amplify";

export default function NewUser() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    // TO DO: add validator for email format
  
    setIsLoading(true);
  
    try {
      await createUser({ name, email });
      history("/team");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  function createUser(user) {
    return API.post("brownie", "/users", {
      body: user
    });
  }

  return (
    <div className="NewUser">
      <Form onSubmit={handleSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Group controlId="name">
          <Form.Control
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

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
    </div>
  );
}