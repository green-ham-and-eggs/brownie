import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { onError } from "../lib/errorLib";
import { API } from "aws-amplify";
import "./Home.css";

export default function Home() {
  const [currentPres, setCurrentPres] = useState();
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const presentation = await loadPresentation();
        setCurrentPres(presentation);
        setTopic(presentation.topic);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, []);
  
  function loadPresentation() {
    return API.get("brownie", "/currentPres");
  }

  async function pickNewPresenter(){
    await API.get("brownie", "/present");
    const presentation = await loadPresentation();

    setCurrentPres(presentation);
    setTopic(presentation.topic);
  }

  function confirm(userAndTopic){
    return API.put("brownie", "/present", {
      body: userAndTopic
    });
  }

  function displayCurrentPresenter(){
    return (
      <div className="next-pres">
        <p className="text-muted">Next presentation:</p>
        <h1>{currentPres.name}</h1>
        <p className="text-muted">Topic:</p>
        <h3>{topic}</h3>
        <Button
          variant="primary"
          size="lg"
          active
          onClick={() => pickNewPresenter()}
        >
          Pick a new presenter
        </Button>{' '}
        <Button
          variant="success"
          size="lg"
          active
          onClick={() => confirm({ userId: currentPres.userId, topic})}
        >
          {currentPres.name} is done presenting!
        </Button>
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
      {currentPres ? displayCurrentPresenter() : noCurrentPresenter()}
    </div>
  );
}