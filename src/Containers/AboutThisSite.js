import React, {Component} from 'react';
import Header from './Header';
import { connect } from 'react-redux';


class AboutThisSite extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <Header loggedIn={this.props.uid}/>
            <div className={"container"}>
                <h1>{"About this site"}</h1>
                <p> {"This site is a portal for Howard university students to use to keep up to date with HU-ACM's activities and programs."
                }</p>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    const checkedUser = state.user || {};
    return {
        uid: checkedUser.uid,
        userData: state.dbUsers,
        events: state.events };
}
export default connect(mapStateToProps)(AboutThisSite);

