import React, { Component } from 'react';
import '../../public/css/user.css';
import UserProfileMenu from './UserProfileMenu';
import { Link } from 'react-router-dom';

class Profile extends Component{
    render(){
        return(
            <div className="container">
                <div className="container-fluid">
                <UserProfileMenu />
                <div className="col-md-9">
                    <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2>Profile</h2>
                        <hr/>
                    </div>
                    <div className="panel-body">
                        <table className="table">
                        <tbody>
                            <tr>
                            <th>First Name</th>
                            <td>{JSON.parse(localStorage.getItem('user_details')).first_name}</td>
                            </tr>
                            <tr>
                            <th>Last Name</th>
                            <td>{JSON.parse(localStorage.getItem('user_details')).last_name}</td>
                            </tr>
                            <tr>
                            <th>Gender</th>
                            <td>{JSON.parse(localStorage.getItem('user_details')).gender}</td>
                            </tr>
                            <tr>
                            <th>Date of Birth</th>
                            <td>{JSON.parse(localStorage.getItem('user_details')).dob}</td>
                            </tr>
                            <tr>
                            <th>Mobile Number</th>
                            <td>{JSON.parse(localStorage.getItem('user_details')).phone}</td>
                            </tr>
                            <tr>
                            <th>Email</th>
                            <td>{JSON.parse(localStorage.getItem('user_details')).email}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className="panel-footer">
                        <hr/>
                        <Link to="/edit_profile" type="button" className="btn btn-default btn-lg">Edit</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Profile;