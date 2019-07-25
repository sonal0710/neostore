import React, { Component } from 'react';
import '../../public/css/cart.css';
import { getAllCartDetails } from '../actions/CartDetailAction';
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/CartDetailAction';
import Notifications, { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';

const CartTotal = ({ cartDetails }) => {
    let price = 0;
    let cartCount = 0;
    if(cartDetails != undefined){
        cartCount = Object.keys(cartDetails).length;
    }
    { cartDetails != undefined ? cartDetails.map((item, index)=> price=price+(item.product_id.product_cost*item.count)):''}
    let GST = (price*5)/100;
    return(
        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-heading text-center panel-heading-custom">
                    <h4>Review Order</h4>
                </div>
                <div className="panel-body">
                    <div className="col-md-12">
                        <strong>Subtotal (# items {cartCount})</strong>
                        <div className="pull-right"><span>₹ {price}</span></div>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <strong>GST(5%)</strong>
                        <div className="pull-right"><span>₹ {GST}</span></div>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <strong>Order Total</strong>
                        <div className="pull-right"><span>₹ {(price + GST)}</span></div>
                        <hr/>
                    </div>            
                </div>
                <div className="panel-footer">
                    <Link type="button" to="/checkaddress" className="btn btn-primary btn-lg btn-block" disabled={cartCount === 0}>Checkout</Link>
                </div>
            </div>
        </div>
    ); 
}

class Cart extends Component{
    constructor(){
        super();
        this.updateCartQuantity = this.updateCartQuantity.bind(this);
        this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
    }
    componentWillMount(){
        this.props.loader(true);
        this.props.getAllCartDetails();
        
    }
    updateCartQuantity(productDetail, qty){
        this.props.loader(true);
        if(qty === 0){
            this.props.loader(false);
            notify.show("Quantity can't be zero", 'error', 1000);
        }else{
            let details = productDetail.product_id;
            var cart = [];
            let new_obj = JSON.parse(JSON.stringify(details));
            new_obj.count = qty;
            cart.push(new_obj);
            cart.push({flag: false});
            this.props.addToCart(cart);
        }
    }
    componentWillReceiveProps(newProps){
        this.props.loader(false);
        if(newProps.deleleCartFlag){
            notify.show("Product successfully deleted from cart", 'success', 1000);
            this.props.getAllCartDetails();
        }
        if(newProps.addCartFlag){
            this.props.getAllCartDetails();
        }
    }
    deleteProductFromCart(productId){
        this.props.loader(true);
        this.props.deleteFromCart(productId);
    }
    render(){
        return(
            <div className="container">
                <Notifications options={{zIndex: 180, top: '90px'}} />
                <div className="row">
                    <div className="col-md-8">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(this.props.cartDetails != undefined) ? this.props.cartDetails.map((cartProduct,i) => (
                                    <tr key={i}>
                                        <td className="col-sm-8 col-md-6">
                                            <div className="media">
                                                <div className="col-sm-4">
                                                    <Link to={"/productDetails/"+cartProduct.product_id.product_id}><img className="media-object cover" src={process.env.REACT_APP_API_URL+"/"+cartProduct.product_id.product_image[0]}/></Link>
                                                </div>
                                                
                                                <div className="media-body">
                                                    <h4 className="media-heading"><Link to={"/productDetails/"+cartProduct.product_id.product_id}>{cartProduct.product_id.product_name}</Link></h4>
                                                    <h5 className="media-heading"> by <small>{cartProduct.product_id.product_producer}</small></h5>
                                                    <span>Status: </span><span className="text-success"><strong>{(cartProduct.product_id.product_stock != 0) ? 'In Stock' : 'Out of Stock'}</strong></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-sm-1 col-md-2 text-center">
                                            <i className="fa fa-minus-circle" onClick={()=>this.updateCartQuantity(cartProduct,(cartProduct.count-1))}></i>
                                            <input type="number" value={cartProduct.count} disabled className="text-center quantity"/>
                                            <i className="fa fa-plus-circle" onClick={()=>this.updateCartQuantity(cartProduct,(cartProduct.count+1))}></i>
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center"><strong>₹{cartProduct.product_id.product_cost}</strong></td>
                                        <td className="col-sm-1 col-md-1 text-center"><strong>₹{(cartProduct.product_id.product_cost * cartProduct.count)}</strong></td>
                                        <td className="col-sm-1 col-md-1">
                                            <button type="button" className="btn btn-sm btn-danger" onClick={() => this.deleteProductFromCart(cartProduct.product_id.product_id)}><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                    )) : <tr><td colSpan="4"></td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <CartTotal cartDetails={this.props.cartDetails}/>
                </div>
            </div>
            // </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartDetails: state.CartDetailReducer.cartDetails,
        deleleCartFlag: state.CartDetailReducer.deleleCartFlag,
        addCartFlag: state.CartDetailReducer.addCartFlag
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllCartDetails: () => { dispatch(getAllCartDetails()) },
        addToCart: (cartData) => { dispatch(addToCart(cartData)) },
        deleteFromCart: (productId) => { dispatch(deleteFromCart(productId)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);