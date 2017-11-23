import React from 'react';
import { database } from '../Firebase';

export class Card extends React.Component {
    constructor () {
        super();
        this.state = {
            users_events:{}
        }
    }

    registerForEvent() {
        let ev_id = this.props.event.id;
        let users_events = {};
        let events = database.ref("users/"+this.props.userID+"/events").once('value').then((snapshot) => {
            let updated_events = snapshot.val();
            updated_events[ev_id] = ev_id;
            console.log(typeof(updated_events));
            database.ref("users/"+this.props.userID+"/events").update(updated_events);
        });
    }

    isRegistered() {
        let users_events = this.props.allUsers[this.props.userID].events;
        if(users_events) {
            return (this.props.event.id in this.props.allUsers[this.props.userID].events);
        }
        return false;
    }
    unregisterForEvent() {
        let ev_id = this.props.event.id;
        let events = database.ref("users/"+this.props.userID+"/events").once('value').then((snapshot) => {
            database.ref("users/"+this.props.userID+"/events/"+ev_id).remove();
        });
    }
    render() {
        const divClass = {
            'paddingTop': '4%',
        }
        
        var items = ['#e83e8c', '#20c997', '#868e96', '#FF7518', '#2780E3'];

        var item = items[Math.floor(Math.random()*items.length)];
        const cardBackground = {
            'backgroundColor': item,
            'borderColor': item,
        }

        const body_text_style = {
            'fontSize': '1.2em',
        }

        function buildAlignCSS(val) {
            const align = {
                'float': val,
            }
            return align;
        }
        return (
            <div className="row" style={divClass}>
    
                <div className="col-md-8 offset-md-2 card card-inverse" style={cardBackground}>
                    <div className="card-header text-center">
                        <h4 className="card-title"> {this.props.event.title}</h4>
                   
                    </div>
                    <div className="card-body body-text" style={body_text_style}>
                        <p className='card-text'> 
                            <a style={buildAlignCSS('left')}> {this.props.event.location} </a>
                            <a style={buildAlignCSS('right')}> {this.props.event.date}</a>
                        </p>
                        <br />
                        <button disabled={(this.isRegistered())}
                                onClick={this.registerForEvent.bind(this)}>
                            Register
                        </button>
                        <button disabled={!(this.isRegistered())}
                                onClick={this.unregisterForEvent.bind(this)}>
                            Un-register
                        </button>
                        <p className="card-text"> {this.props.event.description}</p>
                    </div>
                </div>
            </div>
        );
        

    }
}