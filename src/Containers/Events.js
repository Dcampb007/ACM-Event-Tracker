import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SimpleBox from '../Components/SimpleBox';
import Header from './Header';
import {Link} from 'react-router-dom';
import {Card} from '../Components/EventCard';
import '../Styles/App.css';

class Events extends Component {
    renderEvents() {
        let events = this.props.events;
        let eventList = [];
        //TODO (awogbemila) we need to give event more meaningful IDs other than indexes;
        // I think this can lead to serious problems in the future.
        Object.keys(events).forEach(function (key, index) {
            let ev = {
                title: events[key]['Title'],
                date: events[key]['Date'],
                location: events[key]['Location'],
                description: events[key]['Description'],
                id: index,
            };
            eventList.push(ev);
        });
        const mainContainer = {'paddingBottom': '4%'};
        return (
            <div className="container" style={mainContainer}>
                {
                    eventList.map((listedEvent) => {
                        return <Card key={listedEvent.id}
                                     event={listedEvent}
                                     allUsers={this.props.userData}
                                     userID={this.props.uid}/>
                    })
                }
            </div>);
    }
    renderAdmin() {
        return (
            <div className="text-center">
                <h1> For Admins </h1>
                <Link to="/AddEvent">
                    <button  type="button" className="btn btn-primary">Add Event</button>
                </Link>
                <Link to="/UsersRegistration">
                    <button  type="button" className="btn btn-primary">View Users' Registration</button>
                </Link>`
            </div>
        )
    }
    renderUser() {
        return (
            <div>
                <h1>For User </h1>
            </div>
        )
    }
    render() {
        const { uid, userData } = this.props;
        return (
            <div>
                <Header loggedIn={true} />
                {userData[uid]['isAdmin'] === true
                    ? this.renderAdmin()
                    : this.renderUser()
                }
                {this.renderEvents()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    const checkedUser = state.user || {};
    return {
        uid: checkedUser.uid,
        userData: state.dbUsers,
        events: state.events };
}

export default connect(mapStateToProps, {})(Events);
