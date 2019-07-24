import React, { Component } from 'react';
import UserProfileMenu from './UserProfileMenu';
import { getOrderHistoryDetails } from '../actions/UserProfileAction';
import { connect } from 'react-redux';

class OrderHistory extends Component{
    componentWillMount(){
        this.props.getOrderHistoryDetails();
    }
    render(){
        return(
            <div className="container">
                <div className="container">
                <div className="container-fluid">
                   <UserProfileMenu />
                    <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-heading text-muted">
                        <span className="text-warning"><strong>TRANSIT</strong></span><br/>
                        <span>Order No: 5sd4a442341ds</span>
                        <div>
                            <small>Placed on 15/09/2017 / </small>
                            <small className="text-success"><strong>2000$</strong></small>
                        </div>
                        <hr/>
                        </div>
                        <div className="panel-body">
                        <div className="row">
                            <div className="col-md-3">
                            <div className="thumbnail">
                                <img src="http://via.placeholder.com/150x100" alt="product_image" className="img-rounded"/>
                            </div>
                            </div>
                            <div className="col-md-3">
                            <div className="thumbnail">
                                <img src="http://via.placeholder.com/150x100" alt="product_image" className="img-rounded"/>
                            </div>
                            </div>
                            <div className="col-md-3">
                            <div className="thumbnail">
                                <img src="http://via.placeholder.com/150x100" alt="product_image" className="img-rounded"/>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="panel-footer">
                        <button type="button" className="btn btn-success">Download invoice as PDF</button>
                        </div>
                    </div>
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
        orderHistory: state.UserProfileReducer.orderHistory
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getOrderHistoryDetails: () => { dispatch(getOrderHistoryDetails()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);