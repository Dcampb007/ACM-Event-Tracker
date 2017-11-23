import React, { Component } from 'react';
import Header from '../Containers/Header';
import _ from 'lodash';
import SimpleBox from '../Components/SimpleBox';
import { connect } from 'react-redux';
import { logout, getUser } from '../Actions/UserActions';
import {Card} from '../Components/EventCard';

class Home extends Component {
    renderEvents() {
        let events = this.props.events;
        let eventKeys = this.props.userData[this.props.uid]['events'];
        let eventList = [];
        for(var eventKey in eventKeys) {
            if (eventKey in events) {
                let ev = {
                    title: events[eventKey]['Title'], 
                    date: events[eventKey]['Date'],
                    location: events[eventKey]['Location'],
                    description: events[eventKey]['Description'],
                    id: eventKey,
                };
                eventList.push(ev);
            }
        }
        const mainContainer = {'paddingBottom': '4%'};
        return (
            <div className="container" style={mainContainer}>
                {
                    eventList.map((listedEvent) => {
                        return <Card key={listedEvent.id}
                                     event={listedEvent}
                                     allUsers={this.props.userData}
                                     userID={this.props.uid}  />
                    })
                } 
            </div>
        );
    }
    render() {
        const { uid, userData } = this.props;
    	if (uid) {
    		return (
                <div>
                    <Header loggedIn={true}/>
                    <div className="text-center">
                        <h1>Welcome {userData[uid].fname} {userData[uid].lname}</h1>
                        <h2>My Events</h2>
                        {this.renderEvents()}
                    </div>
                    
                </div>
            );
    	}
    	else {
    		return (
	            <div>
                    <Header loggedIn={false}/>
	            	<h1 className="text-center">Welcome to the ACM Event Tracker</h1>
	        	</div>
	        );
        }
    }
}
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { 
    uid: checkedUser.uid,
    userData: state.dbUsers,
    events: state.events };
}
export default connect(mapStateToProps, {logout, getUser})(Home);

