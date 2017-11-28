import React, { Component } from 'react';
import Header from '../Containers/Header';
import _ from 'lodash';
import SimpleBox from '../Components/SimpleBox';
import { connect } from 'react-redux';
import { logout, getUser } from '../Actions/UserActions';
import Card from './EventCard';
import {Link} from 'react-router-dom';
import '../Styles/App.css';

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
          stime: events[eventKey]['Stime'],
          etime: events[eventKey]['Etime'],
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
            <div className="jumbotron">
              <h1 className="display-3">ACM Event Tracker</h1>
              <p>Welcome to the Howard University ACM Event Tracker.</p>
              <p><Link className="btn btn-primary btn-lg" to="/AboutThisSite">About The Site</Link></p>
            </div>
            <a href="https://www.howard.edu" target={"_blank"}><img src={require("../Images/hu_circle.png")}/></a>
            <a href="https://www.acm.org/about-acm/about-the-acm-organization" target="_blank"><img src={require("../Images/acm_circular_crop.png")}/></a>
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
