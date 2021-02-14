import React, { Component } from "react";

import Event from "./Event";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Report extends Component {
	render() {

		if(this.props.report.brand !== "VIN does not exist"){
			const columns = [
							  {
							    Header: "Type of Info",
							    accessor: "firstName"
							  },
							  {
							  	Header: "Details",
							    accessor: "lastName"
							  }
							];

			const data = [
							{
								"firstName": 'Vehicle Characteristics',
								"lastName": 'sth'
							},
							{
								"firstName": 'Events',
								"lastName": 'sth'
							}
							];
							
							console.log(ReactTable);
			return (
				
				<div className="VariableTable card">
				<p>The brand of this vehicle is: {this.props.report.brand}</p>
				<p>The model of this vehicle is: {this.props.report.model}</p>
				<p>The immatriculation date of this vehicle is: {this.props.report.immatDate}</p>
				<ul>
          			{this.props.events.map(event => (
            		<Event key={event.id} event={event} />
          			))}
        		</ul>
        		 <ReactTable 
        		 columns={columns} 
        		 data={data}>
        		 </ReactTable>
				</div>
				);
		} else{
			 return (
        <p>This VIN does not exist !</p>
          );
		}
		
  }
}

export default Report;