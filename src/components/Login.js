import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { userLogin, loginStatusFalse } from '../actions/UserLoginAction';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'validator';
import '../../public/css/login.css';

const required = (value) => {
    if (!value.toString().trim().length) {
      return(
          <span className="error-msg">Required</span>
      );
    }
};
  
const email = (value) => {
    if (!validator.isEmail(value)) {
        return (
        <span className="error-msg">{value} is not a valid email.</span>);
    }
};

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.checkLoginCredentials = this.checkLoginCredentials.bind(this);
    }
    inputChangeHandler(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    checkLoginCredentials(){
        this.props.loader(true);
        const loginDetails = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.userLogin(loginDetails);
    }
    redirectToDashboard(){
        if(this.props.loginStatus){
            // this.props.getAllCartDetails();
            this.props.loginStatusFalse();
            this.props.loader(false);
            return <Redirect to="/" />
        }
    }
    componentWillReceiveProps(newProps){
        if(!newProps.loginStatus){
            this.props.loginStatusFalse();
            this.props.loader(false);
        }
    }
    render() {
        return(
            <div className="container">
                {this.redirectToDashboard()}
                <div className="container-login">
                <div className="col-md-7">
                    <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="text-center text-muted">Login to NeoSTORE</h2>
                    </div>
                    <div className="panel-body">
                        <p className="text-muted text-center">EASILY USING</p>
                        <button className="btn btn-default btn-lg"><i className="fa fa-facebook fa-lg  text-primary" ></i>Facebook</button>
                        <button className="btn btn-default btn-lg pull-right"><i className="fa fa-google fa-lg text-danger"></i>Google</button>

                        <p className="text-muted text-center">--OR USING--</p>

                        <Form className="form-custom" >
                        {(this.props.loginMessage) && <p className="error-msg">{this.props.loginMessage}</p>}
                        <div className="form-group">
                            <Input type="email" className="form-control" placeholder="Email Address" name="email" onChange={this.inputChangeHandler} validations={[required, email]} value={this.state.email} />
                        </div>
                        <div className="form-group">
                            <Input type="password" className="form-control" placeholder="Password" name="password" onChange={this.inputChangeHandler} validations={[required]} value={this.state.password} />
                        </div>
                        <div className="form-group">
                            <Button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.checkLoginCredentials}>Login</Button>
                        </div>
                        </Form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loginStatus: state.UserLoginReducer.loginStatus,
        loginMessage: state.UserLoginReducer.loginMessage,
        loginError: state.UserLoginReducer.loginError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (loginDetails) => { dispatch(userLogin(loginDetails)) },
        loginStatusFalse: () => { dispatch(loginStatusFalse()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

