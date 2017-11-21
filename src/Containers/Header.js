import React, { Component } from 'react';
import { logout } from '../Actions/UserActions';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import '../Styles/App.css';

class Header extends Component {
  renderLinks() {
    if (this.props.loggedIn)
      return (
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Home</Link><span className="sr-only">(current)</span>
            </li>
            <li className="nav-item">
              <Link to="/Events" className="nav-link">Events</Link>
            </li> 
            <li className="nav-item">
              <Link to="/Events" className="nav-link"onClick={() => {this.props.logout();}}>Logout</Link> 
            </li>
          </ul>
        </div>
      )
    else 
        return(
          <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
               <Link to="/" className="nav-link">Home</Link><span className="sr-only">(current)</span>
            </li>
            <li className="nav-item">
                <Link to="/Login" className="nav-link">Login</Link>
            </li>
          </ul>
          </div>   
        )
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">ACM Event Tracker</Link>
        <button className="navbar-toggler"
          type="button" data-toggle="collapse" data-target="#navbarColor01" 
          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {this.renderLinks()}
      </nav>
    )
  }
}

function mapStateToProps(state) {
    return {
      user: state.user
    };
}
export default withRouter(connect(mapStateToProps, {logout})(Header));
