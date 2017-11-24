import React, { Component } from 'react';
import SimpleBox from '../Components/SimpleBox';
import {InputField, TextAreaField} from '../Components/InputField';
import FooterFormButton from '../Components/FooterFormButton';
import { addEvent} from '../Actions/UserActions';
import { connect } from 'react-redux';
import ErrorAlert from '../Components/ErrorAlert';
import { Field, reduxForm } from 'redux-form';
import {required } from '../Helpers/ReduxFormValidation';
import Header from '../Containers/Header';
class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(data) {
    let index = Object.keys(this.props.events).length;
    let events = this.props.events;
    events[index] = data;
    this.props.addEvent(this.props.uid, events).catch((err) => {
        this.setState({
          error: err
        });
      }
    );
    this.props.history.push('/Events');

  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Header loggedIn={true}/>
        <SimpleBox title="Add Event">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="card-body">
              <Field
                name="Title"
                component={InputField}
                label="Title"
                validate={[required]}
                required={true}
                type="title"
              />
              <Field
                name="Date"
                component={InputField}
                label="Date"
                validate={required}
                required={true}
                type="date"
              />
              <Field
                name="Stime"
                component={InputField}
                label="Start Time"
                validate={required}
                required={true}
                type="time"
              />
              <Field
                name="Etime"
                component={InputField}
                label="End Time"
                validate={required}
                required={true}
                type="time"
              />
              <Field
                name="Location"
                component={InputField}
                label="Location"
                validate={required}
                required={true}
                type="location"
              />
              <Field
                name="Description"
                component={TextAreaField}
                label="Description"
                validate={required}
                required={true}
                type="description"
              />
              {this.state.error && <ErrorAlert>Error Occured</ErrorAlert>}
              <FooterFormButton submitLabel="Create Event" otherLabel="Events"
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
  form: 'AddEventForm'
})(AddEvent);

form = connect(mapStateToProps, {addEvent})(form);

export default form;
