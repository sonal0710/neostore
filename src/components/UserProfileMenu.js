import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserProfileMenu extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="col-md-12">
                    <h4> My Account </h4>
                    <hr/>
                </div>

                <div className="col-md-3">
                    <img src={process.env.REACT_APP_API_URL+"/"+JSON.parse(localStorage.getItem('user_details')).profile_image} 
                        className="img-responsive img-circle profile user-img-icon" alt="profile_pic"/>
                
                    <div className="text-center">
                        <br/>
                        <div className="text-danger"><strong>{JSON.parse(localStorage.getItem('user_details')).first_name} {JSON.parse(localStorage.getItem('user_details')).last_name}</strong></div>
                    </div>
                    <br/>
                    <ul className="nav">
                    <li><Link to="/orders" ><i className="fa fa-pencil fa-fw" aria-hidden="true"></i>&nbsp; Orders</Link></li>
                    <li><Link to="/profile" ><i className="fa fa-user fa-fw" aria-hidden="true"></i>&nbsp; Profile</Link></li>
                    <li><Link to="/address" ><i className="fa fa-address-book fa-fw" aria-hidden="true"></i>&nbsp; Address</Link></li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default UserProfileMenu;