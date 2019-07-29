import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CheckoutHeader extends Component{
    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            <i className="fa fa-shopping-bag fa-lg" aria-hidden="true"> <strong >NeoSTORE</strong> </i>
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ol className="nav navbar-nav navbar-right">
                            <li>
                                <a disabled><i className="fa fa-lock fa-lg" aria-hidden="true"></i> 100% SECURE</a>
                            </li>
                        </ol>
                    </div>
                </div>
            </nav>
        );
    }
}

export default CheckoutHeader;