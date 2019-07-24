import React, { Component } from 'react';
import UserProfileMenu from './UserProfileMenu';
import { Link } from 'react-router-dom';
import { getAddresses, deleteUserAddress } from '../actions/UserProfileAction';
import { connect } from 'react-redux';

class Addresses extends Component{
    constructor(){
        super();
        this.deleteAddress = this.deleteAddress.bind(this);
    }
    componentWillMount(){
        this.props.getAddresses();
    }
    deleteAddress(e){
        let addressId = e.target.getAttribute('address_id');
        this.props.deleteUserAddress(addressId);
        this.props.getAddresses();
    }
    render(){
        return(
            <div className="container">
                <div className="container">
                <div className="container-fluid">
                    <UserProfileMenu />
                    <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                        <h3>Addresses</h3>
                        <hr/>
                        </div>
                        <div className="panel-body">
                            {(this.props.userAddressList !== undefined) ? this.props.userAddressList.map((userAdd, i)=>(
                                <div className="panel panel-default" key={i}>
                                    <div className="panel-body">
                                        <p>{userAdd.address}</p>
                                        <p>{userAdd.city}-{userAdd.pincode}</p>
                                        <p>{userAdd.state}</p>
                                        <p>{userAdd.country}</p>
                                    </div>
                                    <div className="panel-footer">
                                        {/* <input type="radio" name="address"/> Select &nbsp; */}
                                        <Link to={"/edit_address/"+userAdd._id} type="button" className="btn btn-primary">Edit</Link> &nbsp;
                                        <button address_id={userAdd._id} type="button" className="btn btn-danger" onClick={this.deleteAddress}>Delete</button>
                                    </div>
                                </div>
                            )) : ''}
                        </div>            
                        <div className="panel-footer">
                        <hr/>
                        <Link to="/add_address" type="button" className="btn btn-md btn-default btn-lg">Add new</Link>
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
        userAddressList: state.UserProfileReducer.userAddressList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAddresses: () => { dispatch(getAddresses()) },
        deleteUserAddress: (addressId) => { dispatch(deleteUserAddress(addressId)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Addresses);