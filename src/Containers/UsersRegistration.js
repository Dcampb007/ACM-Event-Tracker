import React, { Component } from 'react';
import { database } from '../Firebase';
import { connect } from 'react-redux';
import Header from './Header';

class UsersRegistrationView extends Component {
    constructor() {
        super();
        this.state = {
            attendeeMap : {}
        }
    }

    componentWillMount() {
        const { uid, userData, events } = this.props;
        let attendeeMap = new Object();
        events.forEach((event, index) => {
            let currentEventID = index;
            attendeeMap[currentEventID] = [];
            for(let user in userData) {
                user = userData[user];
                if (user.events) {
                    if (currentEventID in user.events) {
                        //console.log(user.lname+" is going to "+events[currentEventID].Title)
                        //console.log( attendeeMap[currentEventID]);
                        attendeeMap[currentEventID] =  attendeeMap[currentEventID].concat([user]);
                        //console.log(attendeeMap[currentEventID]);
                    }
                }
            }
        });
        this.state.attendeeMap = attendeeMap;
    }

    render () {
        let eventIDs = Object.keys(this.state.attendeeMap);
        let listItems = [];
        eventIDs.forEach((id) => {
           if (this.state.attendeeMap[id].length > 0) {
               //console.log(this.props.events[id].Title+" has "+this.state.attendeeMap[id].length+" registered members");
               listItems.push(<ul key={"event"+id}>{this.props.events[id].Title}
                   {
                       this.state.attendeeMap[id].map((attendee) =>
                       {
                           return<li key={"event"+id+attendee.lname }>{attendee.lname}</li>;
                       }
                       )}

               </ul>);
           }
        });

        return(<div>
            <Header loggedIn={true}/>
            <p>These are the events and the registered memebers.</p>
            <ul>{listItems}</ul>
        </div>);
    }
}

function mapStateToProps(state) {
    const checkedUser = state.user || {};
    return {
        uid: checkedUser.uid,
        userData: state.dbUsers,
        events: state.events };
}
export default connect(mapStateToProps, {})(UsersRegistrationView);
