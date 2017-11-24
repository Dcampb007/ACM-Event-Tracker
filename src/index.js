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
import ListUsers from './Containers/ListUsers';
import Home from './Containers/Home';
import Events from './Containers/Events';
import AddEvent from './Containers/AddEvent';
import SurveyForm from './Containers/Survey';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <LoadingComponent>
        <Switch>
          <Route path="/CreateAccount" component={CreateAccount}/>
          <Route path="/Login" component={Login}/>
          <Route exact path="/" component={Home}/>
          <AuthenticatedComponent>
            <Route path="/Events" component={Events}/>
            <Route path="/AddEvent" component={AddEvent}/>
            <Route path="/Survey" component={SurveyForm}/>
          </AuthenticatedComponent>
        </Switch>
      </LoadingComponent>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
