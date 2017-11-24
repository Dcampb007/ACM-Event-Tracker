import React, { Component } from 'react';
import * as Survey from 'survey-react';
import { connect } from 'react-redux';
import Header from './Header';
import 'survey-react/survey.css';
import '../Styles/App.css';

class SurveyForm extends Component {
  componentWillMount() {    
    Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
  }

  /*
  Overall, how would you rate the event? (Interval scale question from very unsatisfactory to very satisfactory)
Please rate the following aspects of the event: (Interval scale question from very unsatisfactory to very satisfactory)
Date and time
Location
Speakers
Sessions
Food and beverages
Vendors
What did you like most about the event? (Open-ended question)
What did you like least about the event? (Open-ended question)
How do you think this event could have been improved? (Open-ended question)
Was this the first time you attended one of our events? (Yes/no question)
Based on your experience at this event, how likely are you to attend future events? (Interval scale question from very likely to not likely)
How likely are you to recommend our events to a friend/colleague? (Interval scale question from very likely to not likely)
Do you have any other suggestions or comments to help us improve our future events? (Open-ended question)
*/

  render() {    
    var json = {
      questions: [
        { type: "rating", name: "satisfaction", title: "Overall, how would you rate the event?", 
          mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely satisfied" },
        { type: "rating", name: "satisfaction", title: "How would you rate the date and time?", 
          mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely satisfied" },
        { type: "rating", name: "satisfaction", title: "How would you rate the location?", 
          mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely satisfied" },
        { type: "rating", name: "satisfaction", title: "How would you rate the speakers (if applicable)?", 
          mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely satisfied" },
        { type: "rating", name: "satisfaction", title: "How would you rate the food and beverages??", 
          mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely satisfied" },
        { type: "comment", name: "suggestions", title:"Do you have any other suggestions or comments to help us improve our future events?", }
    ]};
    var myCss = {
    navigationButton: "button btn-lg"   
    };
    let model = new Survey.Model(json);    
    return (
      <div >
        <Header loggedIn={true}/>
        <Survey.Survey model={model} css={myCss} cssType={"bootstrap"}/>
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
export default connect(mapStateToProps, {})(SurveyForm);

