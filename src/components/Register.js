import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { userRegister } from '../actions/UserLoginAction';
import { connect } from 'react-redux';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import '../../public/css/register.css';

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
const lt = (value) => {
    if (value.toString().trim().length !== 10) {
      return <span className="error-msg">Contact No. should be of 10 digits</span>
    }
};
const password = (value) => {
    let conpassword = document.getElementById('password').value;
    if (value !== conpassword) { 
      return <span className="error-msg">Passwords are not equal.</span>
    }
};

class Register extends Component {
    constructor(){
        super();
        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            conpassword: '',
            phone: '',
            gender: 'male'
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    inputChangeHandler(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    registerUser(){
        console.log(this.state);
        this.props.userRegister(this.state);
    }
    redirectToLogin(){
        if(this.props.registrationStatus){
            return <Redirect to="/login" />
        }
    }
    render() {
        return(
            <div className="container">
                {this.redirectToLogin()}
                <div className="container-register">
                <div className="col-md-7">
                    <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="text-center text-muted">Register to NeoSTORE</h2>
                    </div>
                    <div className="panel-body">
                        <p className="text-muted text-center">EASILY USING</p>
                        <button className="btn btn-default btn-lg">
                        <i className="fa fa-facebook fa-lg  text-primary" ></i>
                        Facebook
                        </button>
                        <button className="btn btn-default btn-lg pull-right">
                        <i className="fa fa-google fa-lg text-danger"></i>
                        Google
                        </button>

                        <p className="text-muted text-center">--OR USING--</p>

                        <Form className="form-custom" autoComplete="on" noValidate>
                        {(this.props.registrationMessage) && <p className="error-msg">Something went wrong! Try again later.</p>}
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="First Name" value={this.state.first_name} onChange={this.inputChangeHandler} name="first_name" validations={[required]} />
                        </div>
                        <div className="form-group">
                            <Input type="text" className="form-control" placeholder="Last Name" value={this.state.last_name} onChange={this.inputChangeHandler} name="last_name" validations={[required]} />
                        </div>
                        <div className="form-group">
                            <Input type="email" className="form-control" placeholder="Your Email Address" value={this.state.email} onChange={this.inputChangeHandler} name="email" validations={[required, email]} />
                        </div>
                        <div className="form-group">
                            <Input type="password" className="form-control" id="password" placeholder="Choose Password" value={this.state.password} onChange={this.inputChangeHandler} name="password" validations={[required]} />
                        </div>
                        <div className="form-group">
                            <Input type="password" className="form-control" placeholder="Confirm Password" value={this.state.conpassword} onChange={this.inputChangeHandler} name="conpassword" validations={[required, password]} />
                        </div>
                        <div className="form-group">
                            <Input type="number" className="form-control" placeholder="Enter Phone Number" value={this.state.phone} onChange={this.inputChangeHandler} name="phone" validations={[required, lt]} />
                        </div>
                        <div className="form-group">
                            <legend className="gender-legend">I'm</legend>
                            <div className="checkbox" validations={[required]}>
                                <label><Input type="radio" value="male" name="gender" onChange={this.inputChangeHandler} checked={this.state.gender === 'male'} /> <strong>Male</strong> </label>
                                <label><Input type="radio" value="female" name="gender" onChange={this.inputChangeHandler} checked={this.state.gender === 'female'} /> <strong>Female</strong> </label>
                            </div>
                        </div>
                        <Button type="button" className="btn btn-lg btn-primary btn-block" onClick={this.registerUser}>Register</Button>
                        
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
        registrationStatus: state.UserLoginReducer.registrationStatus,
        registrationMessage: state.UserLoginReducer.registrationMessage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userRegister: (regisDetails) => { dispatch(userRegister(regisDetails)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);

