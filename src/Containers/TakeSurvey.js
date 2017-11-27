import React, { Component } from 'react';
import SimpleBox from '../Components/SurveyBox';
import {EmptyInputField} from '../Components/InputField';
import FooterFormButton from '../Components/FooterFormButton';
import { connect } from 'react-redux';
import { updateEventSurveys } from '../Actions/UserActions';
import ErrorAlert from '../Components/ErrorAlert';
import { Field, reduxForm } from 'redux-form';
import {required } from '../Helpers/ReduxFormValidation';
import Header from '../Containers/Header';
import { database } from '../Firebase';

class TakeSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            eventTitle: this.props.match.params.eventTitle,
            eventID: this.props.match.params.eventID,
            timingResponse: '',
            venueResponse: ''
        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { timingResponse, venueResponse } = this.state;
        let surveyResponse = {
            'timingResponse': timingResponse,
            'venueResponse': venueResponse
            };
        this.props.updateEventSurveys(this.state.eventID, this.props.uid, surveyResponse);
    }

    render() {
        const { timingResponse, venueResponse } = this.state;
        const { handleSubmit } = this.props;
        return (
            <div>
                <Header loggedIn={true}/>
                <SimpleBox title={"Take Survey for "+this.state.eventTitle}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="card-body">
                            <Field
                                name="timingResponse"
                                component={EmptyInputField}
                                label="How did you feel about the timing of the event?"
                                value={timingResponse}
                                validate={[required]}
                                required={true}
                                type="title"
                                onChange={this.onChange.bind(this)}
                            />
                            <Field
                                name="venueResponse"
                                component={EmptyInputField}
                                label="How convenient was the venue?"
                                value={venueResponse}
                                validate={[required]}
                                required={true}
                                type="title"
                                onChange={this.onChange.bind(this)}
                            />
                            {this.state.error && <ErrorAlert>Error Occured</ErrorAlert>}
                            <FooterFormButton submitLabel="Submit Survey" otherLabel="Return to Events"
                                              goToLink="/Events" {...this.props}
                            />
                        </div>
                    </form>
                </SimpleBox>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const checkedUser = state.user || {};
    return {
        uid: checkedUser.uid,
        userData: state.dbUsers,
        events: state.events};
}

let form = reduxForm({
    form: 'TakeSurveyForm'
})(TakeSurvey);

form = connect(mapStateToProps, { updateEventSurveys })(form);

export default form;
