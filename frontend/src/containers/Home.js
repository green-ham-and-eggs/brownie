import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { onError } from "../lib/errorLib";
import { API } from "aws-amplify";
import "./Home.css";
import Confetti from 'react-confetti';
import ListGroup from "react-bootstrap/ListGroup";

export default function Home() {
  const [currentPres, setCurrentPres] = useState();
  const [topic, setTopic] = useState("");
  //const [isLoading, setIsLoading] = useState(true);
  const [last, setLast] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const presentation = await loadPresentation();
        lastCandidate(); // Check if the generated presenter is the last candidate
        setCurrentPres(presentation);
        setTopic(presentation.topic);
      } catch (e) {
        onError(e);
      }
      //setIsLoading(false);
    }
    onLoad();
  }, []);
  
  function loadPresentation() {
    return API.get("brownie", "/currentPres");
  }

  async function pickNewPresenter(){
    await API.get("brownie", "/present");
    setIsCelebrating(false);
    lastCandidate();
    const presentation = await loadPresentation();

    setCurrentPres(presentation);
    setTopic(presentation.topic);
  }

  function confirm(userAndTopic){
    setIsCelebrating(true);
    return API.put("brownie", "/present", {
      body: userAndTopic
    });
  }

  async function lastCandidate(){
    const users = await API.get("brownie", "/users");
    const candidates = users.filter(user => !user.presented);
    setLast(candidates.length === 1);
    return;
  }

  function displayInterests() {
    const filteredInterests = currentPres.interest.filter(i => i !== topic);
    console.log(filteredInterests)
    if (filteredInterests.length > 0) {
      return (
        <div>
          <p>{currentPres.name} is also interested in:</p>
          {filteredInterests.map((fi, index) => (
            <ListGroup.Item key={index}>
            <span>
              {fi}
            </span>
            <br />
          </ListGroup.Item>
          ))}
        </div>
      )
    }
  }

  function render(){
    return (
      <div>
        {isCelebrating ? celebrate() : displayCurrentPresenter()}
      </div>
    )
  }

  function celebrate(){
    // TO DO: dnamically change confetti width and height to window size
    return (
      <div className="celebrate">
        <Confetti
        numberOfPieces={400}
        gravity={0.3}
        />
        <h1>Thanks for presenting, {currentPres.name}!&#127881;</h1>
        <Button
          variant="success"
          size="lg"
          active
          onClick={() => pickNewPresenter()}
        >
          Pick a new presenter &#8594;
        </Button>{' '}
      </div>

    )
  }

  function displayCurrentPresenter(){
    
    return (
      <div className="next-pres">
        <p className="text-muted">Next presentation:</p>
        <h1>{currentPres.name}</h1>
        <p className="text-muted">Topic:</p>
        <h3>{topic}</h3>
        {displayInterests()}
        <Button
          variant="primary"
          size="lg"
          active
          onClick={() => pickNewPresenter()}
        >
          Pick a new {last ? 'topic' : 'presenter'}
        </Button>{' '}
        <Button
          variant="success"
          size="lg"
          active
          onClick={() => confirm({ userId: currentPres.userId, topic})}
        >
          {currentPres.name} is done presenting!
        </Button>

        {last ? <p>{currentPres.name} is the last team member who is yet to present!</p> : <></>}

      </div>
    )
  }

  function noCurrentPresenter(){
    return (
      <div className="lander">
        <h1>Brownie</h1>
        <p className="text-muted">All you need for your next team meeting</p>
        <Button
          variant="primary"
          size="lg"
          active
          onClick={() => pickNewPresenter()}
        >
          Pick a new presenter
        </Button>{' '}
      </div>
    )
  }

  return (
    <div className="Home">
      {currentPres ? render() : noCurrentPresenter()}
    </div>
  );
}