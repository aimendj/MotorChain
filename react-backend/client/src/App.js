import React, { Component } from "react";

import "./App.css";
import logo from './logo.svg';
import { BrowserRouter as Link } from 'react-router-dom';

class App extends Component {
 

  render() {
    return (
     
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>MotorChain : Welcome to our website !</h1>
        <div className="App-links">
        <Link to="/Read"/>
        <Link to="/Write" />
        <a href="/Read" className="App-link">Read a report</a>
        <br />
        <a href="/Write">Write a report</a>
        </div>
      </header>
      </div>
    );
  }
}

export default App;
