import React, { Component } from 'react';
import UserProfileMenu from './UserProfileMenu';
import { getOrderHistoryDetails } from '../actions/UserProfileAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrderHistory extends Component{
    componentWillMount(){
        this.props.loader(true);
        this.props.getOrderHistoryDetails();
    }
    componentWillReceiveProps(){
        this.props.loader(false);
    }
    render(){
        return(
            <div className="container">
                <div className="container">
                <div className="container-fluid">
                   <UserProfileMenu />
                    <div className="col-md-9">
                    {(this.props.orderHistoryDetails != undefined) ? this.props.orderHistoryDetails.map((orderDetails,i) => (
                        <div className="panel panel-default" key={i}>
                            {console.log(orderDetails)}
                            <div className="panel-heading text-muted">
                            <span className="text-warning"><strong>TRANSIT</strong></span><br/>
                            <span><b>Order No:</b> {orderDetails.products[0].order_id}</span>
                            <div>
                                <small><b>Placed on:</b> {new Date(orderDetails.products[0].created_at).toDateString("yyyy-MM-dd")} / </small>
                                <small className="text-success"><strong>₹{(orderDetails.products[0].cart_cost) ? orderDetails.products[0].cart_cost : orderDetails.products[0].total_cost}</strong></small>
                            </div>
                            <hr/>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                {orderDetails.products.map((orders,i) => (
                                    <div className="col-md-3" key={i}>
                                        <div className="thumbnail">
                                            <Link to={"/productDetails/"+orders.product_id}><img src={process.env.REACT_APP_API_URL+"/"+orders.order[0].product_image[0]} alt="product_image" className="img-rounded" style={{height:'120px'}}/></Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </div>
                            {/* <div className="panel-footer">
                            <button type="button" className="btn btn-success">Download invoice as PDF</button>
                            </div> */}
                        </div>
                    )) : ''}
                        <hr/>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        orderHistoryDetails: state.UserProfileReducer.orderHistoryDetails
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getOrderHistoryDetails: () => { dispatch(getOrderHistoryDetails()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);