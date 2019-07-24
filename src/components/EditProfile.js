import React, { Component } from 'react';
import UserProfileMenu from './UserProfileMenu';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { updateProfile } from '../actions/UserProfileAction';
import { connect } from 'react-redux';

const required = (value) => {
    if (!value.toString().trim().length) {
      return(
          <span className="error">Required</span>
      );
    }
};
const email = (value) => {
    if (!validator.isEmail(value)) {
        return (
        <span className="error">{value} is not a valid email.</span>);
    }
};
const lt = (value) => {
    if (value.toString().trim().length !== 10) {
      return <span className="error">Contact No. should be of 10 digits</span>
    }
};

class EditProfile extends Component{
    constructor(){
        super();
        let userDetails = JSON.parse(localStorage.getItem('user_details'));
        this.state = {
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            email: userDetails.email,
            phone: userDetails.phone,
            gender: userDetails.gender,
            dob: userDetails.dob,
            profile_image:''
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }
    inputChangeHandler(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    onFileChangeHandler(e){
        this.setState({
            profile_image: e.target.files[0]
        });
    }
    editProfile(e){
        e.preventDefault();
        let formData = new FormData();
        let item = this.state;
        for ( var key in item ) {
            formData.append(key, item[key]);
        }
        this.props.updateProfile(formData);
    }
    render(){
        return(
            <div className="container">
                {/* {(this.props.userProfileStatus) && <Redirect to="/profile" /> } */}
                <div className="container">
                <div className="container-fluid">
                    <UserProfileMenu />
                    <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-body">
                        <h4><strong>Edit Profile</strong></h4>
                        <hr/>

                        <Form noValidate name="edit_profile" id="edit_profile">

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Input type="text" name="first_name" className="form-control" value={this.state.first_name} onChange={this.inputChangeHandler} validations={[required]} />
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Input type="text" name="last_name" className="form-control" value={this.state.last_name} onChange={this.inputChangeHandler} validations={[required]} />
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <div className="checkbox">
                                    <label><Input type="radio" value="male" name="gender" checked={this.state.gender === 'male'} onChange={this.inputChangeHandler}/> <strong>Male</strong> </label>
                                    <label><Input type="radio" value="female" name="gender" checked={this.state.gender === 'female'} onChange={this.inputChangeHandler}/> <strong>Female</strong> </label>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <Input type="date" name="dob" className="form-control" value={this.state.dob} onChange={this.inputChangeHandler} validations={[required]} />
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="mobile">Mobile</label>
                                <Input type="number" name="phone" className="form-control" value={this.state.phone} onChange={this.inputChangeHandler} validations={[required, lt]} />
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input type="email" name="email" className="form-control" value={this.state.email} onChange={this.inputChangeHandler} validations={[required, email]} />
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="profile_pic">Upload Profile Pic</label>
                                <Input type="file" name="profile_pic"className="form-control" onChange={this.onFileChangeHandler} validations={[required]} />
                                </div>
                            </div>
                            </div>

                            <hr/>
                            <Button type="submit" className="btn btn-default btn-lg" onClick={this.editProfile}><i className="fa fa-floppy-o"></i>Save</Button>&nbsp;
                            <Link to="/profile" type="button" className="btn btn-default btn-lg"><i className="fa fa-remove"></i>Cancel</Link>
                        </Form>


                        </div>
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
        userProfileStatus: state.UserProfileReducer.userProfileStatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (userDetails) => { dispatch(updateProfile(userDetails)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);