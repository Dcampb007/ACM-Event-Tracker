import React, {Component} from 'react';
import Header from '../Containers/Header';
import { connect } from 'react-redux';
import { database } from '../Firebase';

class ViewSurveyResponses extends Component{
    constructor(props) {
        super(props);
        this.state = {
            eventTitle: this.props.match.params.eventTitle,
            eventID: this.props.match.params.eventID,
            timingResponses: [],
            venueResponses: []
        }
    }

    componentDidMount() {
        console.log("component will mount called");

        let surveys = database.ref('surveys/events/'+this.state.eventID+"/users").on('value', (snapshot) => {
            snapshot.forEach((user) => {
                const userResponses = user.val();
                this.state.timingResponses = this.state.timingResponses.concat([userResponses.surveyResponse.timingResponse]);
                this.state.venueResponses = this.state.venueResponses.concat([userResponses.surveyResponse.venueResponse]);
            });
        });
    }

    render() {
        //////////////////////////////////////////////////////////////////////
        //temporary workaround for firebase data not being loaded before renderinf occur
        var t = setTimeout(function() { //Start the timer
            this.setState({render: true}) //After 1 second, set render to true
        }.bind(this), 1000);
        //////////////////////////////////////////////////////////////////////
        let timingResponsesList = [];
        let venueResponsesList = [];
        this.state.timingResponses.forEach((timingResponse, index) => {
            timingResponsesList.push(<li className="list-group-item" key={timingResponse+index}>
                { timingResponse }</li>);
        });
        this.state.venueResponses.forEach((venueResponse, index) => {
            venueResponsesList.push(<li className="list-group-item" key={venueResponse+index}>
                { venueResponse }</li>);
        });
        return (<div>
            <Header loggedIn={true}/>
            <div className="container">
                <h1>SurveyResponses for {this.state.eventTitle}</h1>
                <h2>Timing Responses</h2>
                <ul className="list-group">{ timingResponsesList }</ul>
                <h2>Venue Responses</h2>
                <ul className="list-group">{ venueResponsesList }</ul>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    const checkedUser = state.user || {};
    return {
        uid: checkedUser.uid,
        userData: state.dbUsers,
        events: state.events,
        timingResponses: state.timingResponses,
        venueResponses: state.venueResponses };
}

export default connect(mapStateToProps, {})(ViewSurveyResponses);
