import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductDetails, productRating } from '../actions/ProductsDetailAction';
import '../../public/css/product-details.css';
import StarRatingComponent from 'react-star-rating-component';
import Notifications, { notify } from 'react-notify-toast';
import Magnifier from "react-magnifier";
import { addToCart } from '../actions/CartDetailAction';

const Specifications = ({ dimension, material }) => {
    return(
        <span>
            <p><b>Dimensions: </b>{dimension}</p>
            <p><b>Material: </b>{material}</p>
        </span>
    );
}

// const Rating = ({ rating }) => {
//     let starRating = [];
//     for (let i=0; i<5; i++){
//         if(i < rating){
//             starRating.push(<i className="fa fa-lg fa-star" key={i}></i>);
//         }else{
//             starRating.push(<i className="fa fa-lg fa-star-o" key={i}></i>);
//         }
//     }
//     return starRating;
// }

const Modal = ({ show, modalHandler, data, rateProductClickAction, rateProduct }) => {
    const showHideClassName = show ? "modal show" : "modal hide";
    return(
        <div className={showHideClassName} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                <div className="modal-body">
                    <div className="text-warning text-center">
                    <StarRatingComponent 
                        name="rate2"
                        starCount={5}
                        edit={true} half={true} value={data}
                        renderStarIcon={() => <span><i className="fa fa-lg fa-star-o"></i></span>}
                        onStarClick={rateProductClickAction}
                        onStarHover={rateProductClickAction}
                    />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={modalHandler}>CLOSE</button>
                    <button type="button" className="btn btn-primary" onClick={rateProduct}>RATE IT</button>
                </div>
                </div>
            </div>
        </div>
    );
}

class ProductDetails extends Component {
    constructor(){
        super();
        this.state = {
            showModal: false,
            product_rating: 0,
            product_id: ''
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.rateProduct = this.rateProduct.bind(this);
        this.addToCartHandler = this.addToCartHandler.bind(this);
    }
    componentWillMount(){
        let productId = this.props.match.params.id;
        this.setState({ product_id: productId });
        this.props.getProductDetails(productId);
    }
    showModal(){
        this.setState({ showModal: true });
    }
    
    hideModal() {
        this.setState({ showModal: false });
    }
    onStarClick(nextValue){
        this.setState({ 
            product_rating: nextValue
        });
    }
    componentWillReceiveProps(newProps){
        if(newProps.updateRating){
            if(newProps.errorRating != undefined && newProps.errorRating != ''){
                notify.show(newProps.errorRating, 'error', 1000);
            }else{
                notify.show(newProps.successRating, 'success', 1000);
            }
            this.props.getProductDetails(this.state.product_id);
        }
        if(newProps.addCartFlag){
            notify.show("Product successfully added to cart", 'success', 1000);
        }
    }
    rateProduct(){
        this.props.productRating(this.state);
        this.setState({ showModal: false });
    }
    addToCartHandler(product){
        var cart = [];
        let new_obj = JSON.parse(JSON.stringify(product));
        cart.push(new_obj);
        cart.push({flag: false});
        if(localStorage.getItem('logintoken')){
            this.props.addToCart(cart);
        }else{
            notify.show('Please login first', 'error', 1000);
        }
    }
    render() {
        return( 
            <div className="container">
                <Notifications options={{zIndex: 200, top: '90px'}} />
                <div className="card">
                <div className="row">
                    <div className="wrapper">
                    <div className="col-md-6">
                        <div className="preview">
                        <div className="preview-pic tab-content">
                            <div className="my-img active"><Magnifier className="actual-img" height={250} src={this.props.productDetails ? process.env.REACT_APP_API_URL+"/"+this.props.productDetails.product_image[0] : ''}/></div>
                        </div>
                        <br />
                        <ul className="preview-thumbnail nav nav-tabs">
                        {this.props.productDetails ? this.props.productDetails.product_image.map((imageDetails, i) => (
                            <li key={i}>
                                <div className="my-img-thumb"><img className="product_sub_img" src={process.env.REACT_APP_API_URL+"/"+imageDetails} /></div>
                            </li>

                        )): ''}
                        </ul>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="details">
                        <h3 className="text-danger">{this.props.productDetails ? this.props.productDetails.product_name : ''}</h3>
            
                        <div className="text-warning">
                            {/* <Rating rating={this.props.productDetails ? this.props.productDetails.product_rating : ''}/> */}
                            <StarRatingComponent 
                                name="rate1"
                                starCount={5}
                                half={true}
                                renderStarIcon={() => <span><i className="fa fa-lg fa-star"></i></span>}
                                value={this.props.productDetails ? this.props.productDetails.product_rating : 0}
                            />
                        </div>
            
                        <hr/>
                        <h4>Price: <span className="text-success">₹ {this.props.productDetails ? this.props.productDetails.product_cost : ''}</span></h4>
                        <h4>Color:
                            {this.props.productDetails ? <span className="color" style={{ backgroundColor: this.props.productDetails.color_id.color_name }}></span> : ''}
                        </h4>
                        <div className="action">
                            <h4>Share on
                                <i className="fa fa-share-alt fa-lg"></i>
                            </h4>
                            <div className="share-container">
                            <a href="#" className="btn btn-primary"><i className="fa fa-lg fa-facebook"></i></a>&nbsp;
                            <a href="#" className="btn btn-danger"><i className="fa fa-lg fa-google"></i></a>&nbsp;
                            <a href="#" className="btn btn-info"><i className="fa fa-lg fa-twitter"></i></a>&nbsp;
                            <a href="#" className="btn btn-primary"><i className="fa fa-lg fa-linkedin"></i></a>&nbsp;
                            <a href="#" className="btn btn-success"><i className="fa fa-lg fa-whatsapp"></i></a>
                            </div>
                        </div>
            
                        <div className="action">
                            <button className="btn btn-primary" type="button" onClick={() => this.addToCartHandler(this.props.productDetails)}>ADD TO CART</button>&nbsp;
                            <button type="button" className="btn btn-warning" onClick={this.showModal}>RATE PRODUCT</button>
            
                            <Modal show={this.state.showModal} modalHandler={this.state.showModal ? this.hideModal : this.showModal} data={this.state.product_rating} rateProductClickAction={this.onStarClick.bind(this)} rateProduct={this.rateProduct}/>
                        </div>
                        </div>
                    </div>
                    </div>
                    <hr/>
                    <div className="wrapper">
                    <div className="col-md-12">
                        <div className="preview">
                        <div>
                            <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">Description</a></li>
                            <li role="presentation"><a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">Specifications</a></li>
                            </ul>
                            <br/>
                            <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="tab1">{this.props.productDetails ? this.props.productDetails.product_desc : ''}</div>
                            <div role="tabpanel" className="tab-pane" id="tab2"><Specifications dimension={this.props.productDetails && this.props.productDetails.product_dimensions} material={this.props.productDetails && this.props.productDetails.product_material}/></div>
                            </div>
            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className={this.state.showModal ? "modal-backdrop in" : ""}></div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        productDetails: state.ProductsDetailReducer.productDetails,
        errorRating: state.ProductsDetailReducer.errorRating,
        successRating: state.ProductsDetailReducer.successRating,
        updateRating: state.ProductsDetailReducer.updateRating,
        addCartFlag: state.CartDetailReducer.addCartFlag
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetails: (id) => { dispatch(getProductDetails(id)) },
        productRating: (ratingDetails) => { dispatch(productRating(ratingDetails)) },
        addToCart: (cartData) => { dispatch(addToCart(cartData)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);