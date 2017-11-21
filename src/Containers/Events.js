import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SimpleBox from '../Components/SimpleBox';
import Header from './Header';
import {Link} from 'react-router-dom';
import '../Styles/App.css';
import EventDisplay from '../Components/EventDisplay';

class Events extends Component {
  renderEvents() {
    const { events, uid } = this.props;
    return _.map((index, details) => {
      return (
        <SimpleBox title="Event's Name Name">
          <div className="card-body text-center">
            {index} {details['Title']}
          </div>
        </SimpleBox>
      );
    });
  }
  renderAdmin() {
    return (
      <div className="text-center">
        <h1> For Admins </h1>
        <Link to="/AddEvent">
          <button  type="button" className="btn btn-primary">Add Event</button> 
        </Link>
        {this.renderEvents()}
      </div>
      )
  }

  renderUser() {
    return (
      <h1>For User </h1>
      )
  }
  /*
          <div className="text-center">
          <h1>Events</h1></div>}
        {this.renderUsers()}
      </div>
      */

  render() {
    const { uid, userData } = this.props;
    return (
      <div>
        <Header loggedIn={true} />
        {userData[uid]['isAdmin'] === true
          ? this.renderAdmin()
          : this.renderUser()
        }
	<EventDisplay/>
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
