import React from 'react';
import ReactDOM from 'react-dom';
import { Amplify } from 'aws-amplify';
import config from './config';
import './index.css';
import App from './App';
import Team from './containers/Team'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

// Initialize AWS Amplify
Amplify.configure({
  Storage: {
    region: config.apiGateway.REGION,
  },
  API: {
    endpoints: [
      {
        name: "brownie",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Team />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
