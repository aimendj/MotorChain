import React, { Component } from "react";
import Wait from "./Wait";

import { BrowserRouter as Link } from 'react-router-dom';

import "./App.css";
import logo from './logo.svg';

class AppRead extends Component {
  state = { accounts: null,
    report: {
      vin: '', brand: '', model: '', immatDate: ''
    }, 
    input: {
      vin: ''
    },
    events: [{
    id:'',
    date: '', 
    mileage:'', 
    type:'', 
    description:''}]
  };

  componentDidMount = async () => {
    try {
      
      const accounts = await fetch('/api/accounts').then(res => res.json());
       
      await fetch('/api/unlockAccount/', {method: "POST", 
    body: JSON.stringify({ 
        user: accounts.value[0], 
        pw: "password"
    }), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
    }); 
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ accounts});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load accounts or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleSubmit = async (event) => 
  {
    event.preventDefault();

    let report = {...this.state.report};
    report.vin = this.state.input.vin;
    report.brand = "Please Wait";
    this.setState({report});
    const res = await fetch('/api/findVIN/' + report.vin).then(res => res.json());
    this.setState({input: res.input, report: res.report});
    console.log(res.events);
    this.setState({events: res.events});
    console.log(this.state);
    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get(this.state.inputValue).call();
    //console.log(response);
    //this.setState({vin: this.state.inputValue, inputValue:'', report: response});
  }

  handleChange = (event) => {
    let input = {...this.state.input};
    input.vin = event.currentTarget.value;
    this.setState({input});
  }


  render() {
    if (!this.state.accounts) {
      return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Loading... </h1>
      </header>
      </div>;
    }
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>MotorChain : Read Report of a vehicle !</h1>
        <Link to="/" />
        <a href="/">Home</a>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>VIN: </label> 
          <input type="text" id="fname" name="fname" placeholder="Enter VIN" value={this.state.input.vin} onChange={this.handleChange}/> <br />
          <input type="submit" value="Submit" disabled={this.state.report.brand === "Please Wait"}/>
        </form>
        <div id="response">
        <Wait type="read" events={this.state.events} report={this.state.report} vin={this.state.vin}/>
        </div>
        <br />
      </header>

        
      </div>
    );
  }
}

export default AppRead;
