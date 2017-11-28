import React, {Component} from 'react';
import Header from './Header';
import { connect } from 'react-redux';


class AboutACM extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        function logoStyle() {
            return {
                'float': 'left',
                'width': '100px',
                'height': '100px'
            }
        }
        return (
            <div>
                <Header loggedIn={this.props.uid}/>
                <div className={"container"}>
                    <img src={require("../Images/acm_logo.png")} style={logoStyle()}/>
                    <h1>{"About the ACM Organization"}</h1>
                    <p> {"ACM brings together computing educators, researchers, and professionals to inspire dialogue, share" +
                    " resources, and address the field's challenges. As the world’s largest computing society, ACM strengthens" +
                    " the profession's collective voice through strong leadership, promotion of the highest standards, and " +
                    "recognition of technical excellence. ACM supports the professional growth of its members by providing " +
                    "opportunities for life‐long learning, career development, and professional networking.\n" +
                    "\n" +
                    "Founded at the dawn of the computer age, ACM’s reach extends to every part of the globe, with more than" +
                    " half of its 100,000 members residing outside the U.S.  Its growing membership has led to Councils in" +
                    " Europe, India, and China, fostering networking opportunities that strengthen ties within and across " +
                    "countries and technical communities.  Their actions enhance ACM’s ability to raise awareness of computing’s" +
                    " important technical, educational, and social issues around the world."}</p>
                    <p>{"Culled from"} <a target="_blank" href={"https://www.acm.org/about-acm/about-the-acm-organization"}>ACM's website.</a></p>
                </div>
                <a href="https://www.howard.edu" target={"_blank"}><img src={require("../Images/hu_circle.png")}/></a>
                <a href="https://www.acm.org/about-acm/about-the-acm-organization" target="_blank"><img src={require("../Images/acm_circle.png")}/></a>
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
export default connect(mapStateToProps)(AboutACM);

