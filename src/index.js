import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/index';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Containers/Login';
import CreateAccount from './Containers/CreateAccount';
import LoadingComponent from './Containers/LoadingComponent';
import AuthenticatedComponent from './Containers/AuthenticatedComponent';
import Home from './Containers/Home';
import UsersRegistrationView from './Containers/UsersRegistration';
import TakeSurvey from './Containers/TakeSurvey';
import ViewSurveyResponses from './Actions/ViewSurveyResponses';
import Events from './Containers/Events';
import AddEvent from './Containers/AddEvent';
import AboutACM from './Containers/About';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <LoadingComponent>
                <Switch>
                    <Route path="/CreateAccount" component={CreateAccount}/>
                    <Route path="/About" component={AboutACM}/>
                    <Route path="/Login" component={Login}/>
                    <Route exact path="/" component={Home}/>
                    <AuthenticatedComponent>
                        <Route path="/Events" component={Events}/>
                        <Route path="/AddEvent" component={AddEvent}/>
                        <Route path="/UsersRegistration" component={UsersRegistrationView}/>
                        <Route path="/TakeSurvey/:eventID/:eventTitle" component={TakeSurvey}/>
                        <Route path="/ViewSurveyResponses/:eventID/:eventTitle" component={ViewSurveyResponses}/>
                    </AuthenticatedComponent>
                </Switch>
            </LoadingComponent>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
