import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SimpleBox from '../Components/SimpleBox';
import EventDisplay from '../Components/EventDisplay';
import Header from './Header';
import {Link} from 'react-router-dom';
import '../Styles/App.css';
class Events extends Component {

  renderAdmin() {
    return (
      <div className="text-center">
        <h1> For Admins </h1>
        <Link to="/AddEvent">
          <button  type="button" className="btn btn-primary">Add Event</button> 
        </Link>
        <EventDisplay events={this.props.events} uid={this.props.uid} userData={this.props.userData}/>
      </div>
      )
  }

  renderUser() {
    return (
      <div>
        <h1>For User </h1>
        <EventDisplay events={this.props.events} uid={this.props.uid}/>
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