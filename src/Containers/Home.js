import React, { Component } from 'react';
import Header from '../Containers/Header';
import _ from 'lodash';
import SimpleBox from '../Components/SimpleBox';

import { connect } from 'react-redux';
import { logout, getUser } from '../Actions/UserActions';

class Home extends Component {

    renderEvents() {
        const { userData, uid } = this.props;
        return _.map(_.filter(userData, (user, key) => {
          return key !== uid;
        }), (user, key) => {
          return (
            <SimpleBox key={key} title="User's Name">
              <div className="card-body text-center">
                {user.fname} {user.lname}
              </div>
            </SimpleBox>
          );
        });
      }
    render() {

        const { uid, userData } = this.props;
    	if (uid) {
    		return (
                <div>
                    <Header loggedIn={true}/>
                    <div className="text-center">
                        <h1>Welcome {userData[uid].fname} {userData[uid].lname}</h1>
                    </div>
                </div>
            );
    	}
    	else {
    		return (
	            <div>
                    <Header loggedIn={false}/>
	            	<h1 className="text-center">Welcome to the ACM Event Tracker</h1>
	        	</div>
	        );
        }
    }
}
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid, userData: state.dbUsers };
}
export default connect(mapStateToProps, {logout, getUser})(Home);

