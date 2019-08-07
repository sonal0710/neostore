import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class ThankyouPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container thankyou">
                {(this.props.location.state === undefined) && <Redirect to="/" />}
                <h3>Your order is placed successfully.</h3>
                <h4>Thank You!!</h4>
                Go back to <Link to="/">Home</Link> page.
            </div>
        );
    }
}

export default ThankyouPage;