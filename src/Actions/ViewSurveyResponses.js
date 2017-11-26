import React, {Component} from 'react';
import Header from '../Containers/Header';
import { connect } from 'react-redux';
import { database } from '../Firebase';

class ViewSurveyResponses extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            eventTitle: this.props.match.params.eventTitle,
            eventID: this.props.match.params.eventID,
            timingResponses: [],
            venueResponses: []
        }
    }

    componentWillMount() {
        let surveys = database.ref('surveys/events/'+this.state.eventID+"/users").on('value', (snapshot) => {
            snapshot.forEach((user) => {
                const userResponses = user.val();
                this.state.timingResponses = this.state.timingResponses.concat([userResponses.surveyResponse.timingResponse]);
                this.state.venueResponses = this.state.venueResponses.concat([userResponses.surveyResponse.venueResponse]);
            });
        });
    }

    render() {
        let timingResponsesList = [];
        let venueResponsesList = [];
        this.state.timingResponses.forEach((timingResponse, index) => {
            timingResponsesList.push(<li className="list-gorup-item" key={timingResponse+index}>
                { timingResponse }</li>);
        });
        this.state.venueResponses.forEach((venueResponse, index) => {
            venueResponsesList.push(<li className="list-gorup-item" key={venueResponse+index}>
                { venueResponse }</li>);
        });
        return (<div>
            <Header loggedIn={true}/>
            <div className="container">
                <h1>SurveyResponses for {this.state.eventTitle}</h1>
                <h2>Timing Responses</h2>
                <ul>{ timingResponsesList }</ul>
                <h2>Venue Responses</h2>
                <ul>{ venueResponsesList }</ul>
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
