import React, { Component } from "react";

import Report from "./Report";
class Wait extends Component {
	render() {
		if(this.props.type === "read"){
			if(this.props.report.vin === ""){
			return (<p>Please enter a VIN and submit !</p>);
		}

		if(this.props.report.brand === "Please Wait"){
			return (<p>Please wait !</p>);
		}

		return(<Report report={this.props.report} events={this.props.events}/>);
		} 

		if(this.props.type === "write"){
			if(this.props.report.brand === "Please Wait"){
			return (<p>Please wait !</p>);
		} 

		if(this.props.report.brand === "Done"){
			return (<p>Thank you for your submission !</p>);
		} 

		if(this.props.report.brand === "Already Created"){
			return (<p>An initial report already exists !</p>);
		} 
		return (<p>Please fill the form and submit !</p>);
		}
		
		
		
  }
}

export default Wait;