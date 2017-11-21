import React from 'react';
import {auth, database} from '../Firebase';
import {Card} from './EventCard.js';

class EventDisplay extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			eventList: [],
		}
	}
	render () {
		const mainContainer = {
			'paddingBottom': '4%',
		};

		return (
			<div className="container" style={mainContainer}>
				{
					this.state.eventList.map((listedEvent) => {
						return <Card key={listedEvent.id} event={listedEvent}/>
					})
				}
				
			</div>);
	}

	componentWillMount() {
		let events = this.props.events;
		console.log(typeof(events));
		let eventList = [];

		Object.keys(events).forEach(function(key,index) {
			let ev = {
					title: events[key]['Title'], 
					date: events[key]['Date'],
					location: events[key]['Location'],
					description: events[key]['Description'],
					id: index,
			};
			eventList.push(ev);
		});
		this.setState({eventList});		
	}
	

}


export default EventDisplay;