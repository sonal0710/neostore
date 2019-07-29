import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ThankyouPage extends Component{
    render(){
        return(
            <div className="container thankyou">
                <h3>Your order is placed successfully.</h3>
                <h4>Thank You!!</h4>
                Go back to <Link to="/">Home</Link> page.
            </div>
        );
    }
}

export default ThankyouPage;