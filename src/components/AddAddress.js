import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserProfileMenu from './UserProfileMenu';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';
import { connect } from 'react-redux';
import { addUserAddress } from '../actions/UserProfileAction';

const required = (value) => {
    if (!value.toString().trim().length) {
      return(
          <span className="error">Required</span>
      );
    }
};

class AddAddress extends Component{
    constructor(props){
        super(props);
        console.log(this.props.location.state.flag);
        this.state = {
            address:'',
            pincode:'',
            city:'',
            state:'',
            country:'',
            redirect: false
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.addAddress = this.addAddress.bind(this);
    }
    inputChangeHandler(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    addAddress(e){
        this.props.loader(true);
        e.preventDefault();
        this.props.addUserAddress(this.state);
    }
    render(){
        return(
            <div className="container">
                {(this.props.addAddressStatus && this.props.addAddressStatus != undefined && this.props.location.state.flag) && <Redirect to="/address" />}
                {(this.props.addAddressStatus && this.props.addAddressStatus != undefined && (this.props.location.state.flag === false)) && <Redirect to="/checkaddress" />}
                <div className="container">
                <div className="container-fluid">
                    <UserProfileMenu />
                    <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-body">
                        <h4><strong>Add new address</strong></h4>
                        <hr/>
                        <Form  noValidate>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="fulladdress">Address</label>
                                <Textarea type="text" className="form-control" name="address" value={this.state.address} onChange={this.inputChangeHandler} validations={[required]} ></Textarea>
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="pincode">Pincode</label>
                                <Input type="number" className="form-control" name="pincode" value={this.state.pincode} onChange={this.inputChangeHandler} validations={[required]} />
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="city">City</label>
                                <Input type="text" className="form-control" name="city" value={this.state.city} onChange={this.inputChangeHandler} validations={[required]} />
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="state">State</label>
                                <Input type="text" className="form-control" name="state" value={this.state.state} onChange={this.inputChangeHandler} validations={[required]} />
                                </div>
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <Input type="text" className="form-control" name="country" value={this.state.country} onChange={this.inputChangeHandler} validations={[required]} />
                                </div>
                            </div>
                            </div>

                            <hr/>
                            <Button type="submit" className="btn btn-default btn-lg" onClick={this.addAddress}><i className="fa fa-floppy-o"></i>Save</Button>&nbsp;
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
        addAddressStatus: state.UserProfileReducer.addAddressStatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addUserAddress: (addressDetails) => { dispatch(addUserAddress(addressDetails)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);