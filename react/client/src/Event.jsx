import React from "react";
import "./Report.css"

const Event = ({ event }) => (
					<li> Event : 
            			<p>The type of the event is: {event.type}</p>
            			<p>The date of the event is: {event.date}</p>
            			<p>The mileage of the car when the event occured is: {event.mileage} km</p>
            			<p>The description of the event is: {event.description}</p>
          			</li>
          		);

export default Event;