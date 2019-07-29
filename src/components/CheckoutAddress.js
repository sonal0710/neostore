import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getAddresses } from '../actions/UserProfileAction';
import { connect } from 'react-redux';
import { addToCart } from '../actions/CartDetailAction';

class CheckoutAddress extends Component{
    constructor(){
        super();
        this.state = {
            checked: false,
            delieveryAdd: '',
            redirect: false
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }
    componentWillMount(){
        this.props.loader(true);
        this.props.getAddresses();
    }
    changeHandler(e){
        let delieveryAdd = e.target.getAttribute('address_id');
        this.setState({
            checked: true,
            delieveryAdd: delieveryAdd
        });
    }
    componentWillReceiveProps(){
        this.props.loader(false);
    }
    placeOrder(){
        var cart = [];
        let new_obj = JSON.parse(localStorage.getItem('cartDetails'));
        { new_obj != undefined ? new_obj.map((item, index)=> (
            item.product_id.count = item.count ,
            cart.push(item.product_id) )):''}
        cart.push({address_id: this.state.delieveryAdd});
        cart.push({flag: true});
        console.log(cart);
        this.setState({
            redirect: true
        }, () => {
            this.props.addToCart(cart);
        });
    }
    render(){
        return(
            <div className="container">
                {(this.state.redirect) && <Redirect to="/thankyou"/>}
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3>Select delivery address</h3>
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
                                    <input type="radio" address_id={userAdd._id} name="address" onChange={this.changeHandler}/> Select &nbsp;&nbsp;
                                    <Link to={{
                                        pathname:"/edit_address/"+userAdd._id,
                                        state: {
                                            flag: false
                                        }
                                    }} type="button" className="btn btn-primary"> Edit</Link>
                                </div>
                            </div>
                        )) : ''}
                    </div>
                    <div className="panel-footer">
                        <hr/>
                        <button type="button" className="btn btn-success btn-md pull-right" disabled={(this.state.checked == false)} onClick={this.placeOrder}> Place Order <i className="fa fa-angle-double-right"></i></button>
                        <Link to={{
                            pathname: "/add_address",
                            state: {
                                flag: false
                            }
                        }} type="button" className="btn btn-default btn-md"> Add New <i className="fa fa-plus"></i></Link>
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
        addToCart: (cartData) => { dispatch(addToCart(cartData)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddress);