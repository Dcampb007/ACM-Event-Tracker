import React, { Component } from 'react';
import SurveyBox from '../Components/SurveyBox';
import InputField from '../Components/InputField';
import FooterFormButton from '../Components/FooterFormButton';
import { connect } from 'react-redux';
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
            timingResponse: '',
            venueResponse: ''
        };
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { timingResponse, venueResponse } = this.state;
        console.log(this.props);
        let s = new URLSearchParams(this.props.location.search);
        console.log(s.get('eventID'));
    }

    render() {
        const { timingResponse, venueResponse } = this.state;
        const { handleSubmit } = this.props;
        return (
            <div>
                <Header loggedIn={true}/>
                <SurveyBox title="Take Survey">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="card-body">
                            <Field
                                name="timingResponse"
                                component={InputField}
                                label="How did you feel about the timing of the event?"
                                value={timingResponse}
                                validate={[required]}
                                required={true}
                                type="title"
                                onChange={this.onChange.bind(this)}
                            />
                            <Field
                                name="venueResponse"
                                component={InputField}
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
                </SurveyBox>
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

form = connect(mapStateToProps, {})(form);

export default form;
