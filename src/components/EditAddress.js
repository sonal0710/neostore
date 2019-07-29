import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserProfileMenu from './UserProfileMenu';
import { connect } from 'react-redux';
import { editUserAddress } from '../actions/UserProfileAction';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';

const required = (value) => {
    if (!value.toString().trim().length) {
      return(
          <span className="error">Required</span>
      );
    }
};

class EditAddress extends Component{
    constructor(){
        super();
        this.state = {
            address_id:'',
            address: '',
            pincode: '',
            city: '',
            state: '',
            country: '',
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
    }
    componentWillMount(){
        let addressId = this.props.match.params.id;
        let addresses = JSON.parse(localStorage.getItem('addresses'));
        let addressDetails = addresses.filter( function (add) {
            return add._id === addressId
        });
        this.setState({
            address_id: addressId,
            address: addressDetails[0].address,
            pincode: addressDetails[0].pincode,
            city: addressDetails[0].city,
            state: addressDetails[0].state,
            country: addressDetails[0].country,
        });
    }
    inputChangeHandler(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    updateAddress(){
        this.props.loader(true);
        this.props.editUserAddress(this.state);
    }
    render(){
        return(
            <div className="container">
                {(this.props.updateAddressStatus && this.props.updateAddressStatus != undefined) && <Redirect to="/address" />}
                <div className="container">
                <div className="container-fluid">
                    <UserProfileMenu />
                    <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-body">
                        <h4><strong>Edit address</strong></h4>
                        <hr/>
                        <Form noValidate>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="fulladdress">Address</label>
                                <Textarea type="text" className="form-control" name="address" value={this.state.address} onChange={this.inputChangeHandler} validations={[required]}></Textarea>
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="pincode">Pincode</label>
                                <Input type="number" className="form-control" name="pincode" value={this.state.pincode} onChange={this.inputChangeHandler} validations={[required]}/>
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="city">City</label>
                                <Input type="text" className="form-control" name="city" value={this.state.city} onChange={this.inputChangeHandler} validations={[required]}/>
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="state">State</label>
                                <Input type="text" className="form-control" name="state" value={this.state.state} onChange={this.inputChangeHandler} validations={[required]}/>
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <Input type="text" className="form-control" name="country" value={this.state.country} onChange={this.inputChangeHandler} validations={[required]}/>
                                </div>
                            </div>
                            </div>

                            <hr/>
                            <Button type="button" className="btn btn-default btn-lg" onClick={this.updateAddress}><i className="fa fa-floppy-o"></i>Save</Button>&nbsp;
                            <Link to="/address" type="button" className="btn btn-default btn-lg"><i className="fa fa-remove"></i>Cancel</Link>
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
        updateAddressStatus: state.UserProfileReducer.updateAddressStatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editUserAddress: (addressDetails) => { dispatch(editUserAddress(addressDetails)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);