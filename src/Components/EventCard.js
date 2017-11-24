import React from 'react';

export class Card extends React.Component {
    render() {
        console.log(this.props.event);
        const divClass = {
            'paddingTop': '4%',
        }
        
        const cardBackground = {
            'backgroundColor': '#868e96',
            'borderColor': '#868e96',
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
                            <a style={buildAlignCSS('left')}> {this.props.event.location}  </a>
                            <br/>
                            <a style={buildAlignCSS('left')}>From: {this.props.event.stime} -  To: {this.props.event.etime}</a>
                            <br/>
                            <a style={buildAlignCSS('right')}> {this.props.event.date}</a>
                        </p>
                        <br />
                        
                        <p className="card-text"> {this.props.event.description}</p>
                    </div>
                </div>
            </div>
        );
        

    }
}