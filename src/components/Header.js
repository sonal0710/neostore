import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { withRouter } from "react-router-dom";

const history = createBrowserHistory();
const LoggedIn = ({ logout }) => {
    return(
        <ul className="dropdown-menu">
            <li><Link to="/profile"><i className="fa fa-user fa-fw" aria-hidden="true"></i>&nbsp; Profile</Link></li>
            <li><Link to="/orders"><i className="fa fa-list-alt fa-fw" aria-hidden="true"></i>&nbsp; Orders</Link></li>
            <li><Link to="/address"><i className="fa fa-address-card-o fa-fw" aria-hidden="true"></i>&nbsp; Addresses</Link></li>
            <li><a href="#" onClick={logout}><i className="fa fa-sign-out fa-fw" aria-hidden="true"></i>&nbsp; Logout</a></li>
        </ul>
    );
}

const LoggedOut = () => {
    return(
        <ul className="dropdown-menu">
            <li><Link to="/login"><i className="fa fa-sign-in fa-fw" aria-hidden="true"></i>&nbsp; Login</Link></li>
            <li><Link to="/register"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>&nbsp; Register</Link></li>
        </ul>
    );
}

class Header extends Component {
    constructor(){
        super();
        this.userLogOut = this.userLogOut.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
    }
    userLogOut(){
        localStorage.clear();
    }
    searchProducts(){
        var searchString = document.getElementById('search_text').value;
        this.props.history.push({
            pathname: '/listAllProduct',
            search: 'search='+searchString
        })
    }
    render() {
        return(
                <nav className="navbar navbar-default">
                    <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to='/'>
                        <i className="fa fa-shopping-bag fa-lg" aria-hidden="true"> <strong >NeoSTORE</strong> </i>
                    </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="nav navbar-nav">
                        <li><Link to='/'>HOME</Link></li>
                        </ul>

                        <form autoComplete="off" className="pull-left">
                        <div className="row">
                            <div className="col-md-12">
                            <div className="form-group">
                                <div className="input-group search-bar">
                                <input name="search" id="search_text" className="form-control" />
                                <span className="input-group-btn">
                                    <button type="button" className="btn btn-default" onClick={this.searchProducts}>
                                    <i className="fa fa-search"></i>
                                    </button>
                                </span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </form>

                        <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user fa-lg" area-hidden="true"></i>
                                <span className="caret"></span>
                            </a>
                            {(localStorage.getItem('loginstatus')) ? <LoggedIn logout={this.userLogOut} /> : <LoggedOut /> }
                        </li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link className="text-primary" to="/cart">
                                <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>Cart
                            </Link>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
        );
    }
}
export default withRouter(Header);

