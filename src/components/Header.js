import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {debounce} from 'throttle-debounce';
import { searchProducts } from '../actions/ProductsDetailAction';
import { connect } from 'react-redux';

const history = createBrowserHistory();
const LoggedIn = ({ logout, handler }) => {
    return(
        <ul className="dropdown-menu">
            <li onClick={handler}><Link to="/profile"><i className="fa fa-user fa-fw" aria-hidden="true"></i>&nbsp; Profile</Link></li>
            <li onClick={handler}><Link to="/orders"><i className="fa fa-list-alt fa-fw" aria-hidden="true"></i>&nbsp; Orders</Link></li>
            <li onClick={handler}><Link to="/address"><i className="fa fa-address-card-o fa-fw" aria-hidden="true"></i>&nbsp; Addresses</Link></li>
            <li onClick={handler}><Link to="/" onClick={logout}><i className="fa fa-sign-out fa-fw" aria-hidden="true"></i>&nbsp; Logout</Link></li>
        </ul>
    );
}

const LoggedOut = ({ handler }) => {
    return(
        <ul className="dropdown-menu">
            <li onClick={handler}><Link to="/login"><i className="fa fa-sign-in fa-fw" aria-hidden="true"></i>&nbsp; Login</Link></li>
            <li onClick={handler}><Link to="/register"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>&nbsp; Register</Link></li>
        </ul>
    );
}

class Header extends Component {
    constructor(){
        super();
        this.state = {
            searchStr: '',
            autoFlag: false,
            loginStatus: false,
            cartCount: 0
        }
        this.userLogOut = this.userLogOut.bind(this);
        this.searchStateHandler = this.searchStateHandler.bind(this);
        this.stateSetHandler = this.stateSetHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }
    userLogOut(){
        localStorage.clear();
    }
    loginHandler(){
        this.setState({
            loginStatus: !this.state.loginStatus
        })
    }       
    searchStateHandler(e){
        e.persist();
        debounce(100, () => {
            if(e.target.value != ''){
                this.setState({ 
                    searchStr: e.target.value,
                    autoFlag: true
                }, () => {
                    this.props.searchProducts(e.target.value);
                })
            }else{
                this.setState({
                    searchStr: '',
                    autoFlag: false
                })
            }
        })()
    }
    stateSetHandler(){
        this.setState({
            searchStr: '',
            autoFlag: false
        })
    }
    render() {
        // var cartCount = 0;
        // {(localStorage.hasOwnProperty('cartDetails')) ? cartCount = JSON.parse(localStorage.getItem('cartDetails')).length : cartCount = 0 }
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
                            <div className="">
                                <div className="input-group search-bar">
                                    <input name="search" id="search_text" className="form-control" onChange={this.searchStateHandler}/>
                                    <span className="input-group-btn">
                                        <span className="btn btn-default">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </span>
                                </div>
                                <div className={this.state.autoFlag ? "autocomplete" : "autocomplete hide"} >
                                    {((this.props.searchedProducts !== undefined)) ? this.props.searchedProducts.map((product,i) => (
                                        <Link to={"/productDetails/"+product._id} key={i} onClick={this.stateSetHandler}><div>{product.product_name}</div></Link>
                                    )) : ''}
                                </div>
                            </div>
                            </div>
                        </div>
                        </form>

                        <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.loginHandler} role="button" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user fa-lg" area-hidden="true"></i>
                                <span className="caret"></span>
                            </a>
                            {(localStorage.hasOwnProperty('loginstatus')) ? <LoggedIn logout={this.userLogOut} handler={this.loginHandler}/> : <LoggedOut handler={this.loginHandler} /> }
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

const mapStateToProps = (state) => {
    return {
        searchedProducts: state.ProductsDetailReducer.searchedProducts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchProducts: (searchStr) => { dispatch(searchProducts(searchStr)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
