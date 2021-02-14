import React, { Component } from "react";
import Wait from "./Wait";
import "./App.css";
import logo from './logo.svg';

import { BrowserRouter as Link } from 'react-router-dom';

class AppWrite extends Component {
  state = { accounts: null,
    input: {
      vin: '',
      brand: '', 
      model: '', 
      immatDate: '',
      type: 'Initial Report',
      date: '',
      mileage:'',
      description:''
    }, 
    report: {
      vin: '',
      brand: '', 
      model: '', 
      immatDate: ''
    }, 
    inputValue:''};

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
      this.setState({ accounts });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load accounts or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  handleSubmit = async (event) => {
    event.preventDefault();
    
      
      
    let report = {...this.state.report};
    let input = {...this.state.input};

    report.brand = "Please Wait";

    this.setState({report});

    const response = await fetch('/api/createReport/', {method: "POST", 
    body: JSON.stringify({ 
        input: input,
        accounts: this.state.accounts
    }), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
    }).then(res => res.json()); 
     input.vin = '';
      input.brand = '';
      input.model ='';
      input.immatDate='';
      input.type='';
      input.date='';
      input.mileage='';
      input.description='';
    this.setState({input, report: response.report});
      
    
    
    
}


  handleChange = (event, str) => 
  {
    const value = event.currentTarget.value;
    let input = {...this.state.input};
    input[str] = value;
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
       <h1>MotorChain : Add Report of a vehicle !</h1>
        <Link to="/" />
        <a href="/">Home</a>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>VIN: </label> 
          <input type="text" id="fname" name="fname" placeholder="Enter VIN" value={this.state.input.vin} onChange={(e) => this.handleChange(e, "vin")} required/> <br />
          <label>Brand: </label>  
          <input type="text" id="fname" name="fname" placeholder="Enter Brand" value={this.state.input.brand} onChange={(e) => this.handleChange(e, "brand")} required/> <br />
          <label>Model: </label>  
          <input type="text" id="fname" name="fname" placeholder="Enter Model" value={this.state.input.model} onChange={(e) => this.handleChange(e, "model")} required/> <br />
          <label>Immatriculation Date: </label>  
          <input type="date" id="fname" name="fname" placeholder="Enter Immatriculation Date" value={this.state.input.immatDate} onChange={(e) => this.handleChange(e, "immatDate")} required/> <br />
          <label>Type of event: </label>  
          <select name="nom" size="1" value={this.state.input.type} onChange={(e) => this.handleChange(e, "type")} required>
            <option defaultValue value="Initial Report">Initial Report</option>
            <option value="Accident">Accident</option>
            <option value="Theft">Theft</option>
            <option value="Intervention">Intervention</option>
          </select>
          <br />
          <label>Date: </label>  
          <input type="date" id="fname" name="fname" placeholder="Enter Date of event" value={this.state.input.date} onChange={(e) => this.handleChange(e, "date")} required/> <br />
          <label>Mileage (km): </label>  
          <input type="number" id="fname" name="fname" placeholder="Enter the mileage of the car" value={this.state.input.mileage} onChange={(e) => this.handleChange(e, "mileage")} required/> <br />
          <label>Description: </label>  
          <input type="text" id="fname" name="fname" placeholder="Enter a description of the event" value={this.state.input.description} onChange={(e) => this.handleChange(e, "description")} required/> <br />
          
          <input type="submit" value="Submit" disabled={this.state.report.brand === "Please Wait"}/>
        </form>
        <Wait type="write" report={this.state.report}/>

      </header>
        
      </div>
    );
  }
}

export default AppWrite;
