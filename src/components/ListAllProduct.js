import React, { Component } from 'react';
import { getAllCategories, getAllColors, getAllProducts, totalProductCount, setFlagFalse } from '../actions/ProductsDetailAction';
import { addToCart, setFlagStatus } from '../actions/CartDetailAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../public/css/product-list.css';
import StarRatingComponent from 'react-star-rating-component';
import Notifications, { notify } from 'react-notify-toast';
import Pagination from "react-js-pagination";

const AllCategories = ({ allCategories, sortHandler }) => {
    return(
        <div className="panel panel-danger">
            <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#categories">
                <i className="fa fa-lg fa-angle-double-down"></i> Categories
                </a>
            </h4>
            </div>
            <div id="categories" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div className="list-group">
                {allCategories ? allCategories.map((categoryDetail,i) => (
                    <li className="list-group-item" key={i}>
                        <a category_id={categoryDetail._id} onClick={sortHandler} name="category_id"><i className="fa fa-dot-circle-o"></i>  {categoryDetail.category_name.charAt(0).toUpperCase() + categoryDetail.category_name.slice(1)}</a>
                    </li>
                )) : ''}
                
            </div>
            </div>
        </div>
    );
}
const AllColors = ({ allColors, sortHandler }) => {
    return(
        <div className="panel panel-danger">
            <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#colors">
                <i className="fa fa-lg fa-angle-double-down"></i> Colors
                </a>
            </h4>
            </div>
            <div id="colors" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div className="list-group-item">
                <ul className="list-inline">
                    {allColors ? allColors.map((color,i) => (
                        <li key={i}><button type="button" data-toggle="tooltip" name="color_id" color_id={color.color_id} onClick={sortHandler} data-placement="top" title={color.color_name} className="color-box" style={{ background: color.color_code}}></button></li>
                    )) : ''}
                </ul>
            </div>
            </div>
        </div>
    );
}
const AllProductList = ({ allProducts, resetFilters, sortFunction, addToCart, pageHandler, activePage, totalItemsCount }) => {
    return(
        // <div>
            <div className="col-md-9 vertical-line">
                <div className="row padding-row">
                <h5 className="pull-left">All Products</h5>
                <div className="pull-right">
                    <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item" id="nav-item-id">
                        <a className="nav-link" href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab" name="product_rating" orderby="desc" onClick={sortFunction}>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="nav-item" id="nav-item-id">
                        <a className="nav-link" href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab" name="product_cost" orderby="desc" onClick={sortFunction}>
                            <i className="fa fa-inr" aria-hidden="true"></i>
                            <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="nav-item" id="nav-item-id">
                        <a className="nav-link" href="#tab3" aria-controls="tab3" role="tab" data-toggle="tab" name="product_cost" orderby="asc" onClick={sortFunction}>
                            <i className="fa fa-inr" aria-hidden="true"></i>
                            <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        </a>
                    </li>
                    </ul>
                    <br/>
                </div>
                <h5 className="pull-right">Sort By : </h5>
                </div>
                <div className="row reset-btn">
                    <button className="pull-right btn btn-primary btn-sm" onClick={resetFilters}>Clear All Filters</button>
                </div>
                <br/>
                {totalItemsCount === 0 && <div className="col-md-12">No Products Found</div>}
                {allProducts ? allProducts.map((product,i) => (
                    <div className="col-md-4" key={i}>
                    <div className="thumbnail">
                        <div className="img-thumb">
                        <Link to={"/productDetails/"+product.product_id}>
                            <img className="img-reposive product_list_img" src={process.env.REACT_APP_API_URL+"/"+product.product_image[0]} alt="product_image"/>
                        </Link>
                        </div>
                        <div className="caption">
                        <p className="elipse-product"><Link to={"/productDetails/"+product.product_id}>{product.product_name}</Link></p>
                        <button className="pull-right btn btn-danger btn-xs" onClick={() => addToCart(product)} product_id={product.product_id}>Add To Cart</button>
                        <p><strong>₹ {product.product_cost}</strong></p>
                        <fieldset className="rating">
                            <div className="text-warning text-center">
                                <StarRatingComponent 
                                    name="rate1"
                                    starCount={5}
                                    half={true}
                                    renderStarIcon={() => <span><i className="fa fa-lg fa-star"></i></span>}
                                    value={product.product_rating}
                                />
                            </div>
                        </fieldset>
                        </div>
                    </div>
                    </div>
                )) : ''}
                <div className="row col-sm-12">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={2}
                        onChange={pageHandler}
                    />
                </div> 
            </div>
    );
}
class ListAllProduct extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        let categoryId = '';
        if(this.props.location.state !== undefined){
            categoryId = this.props.location.state.category_id;
        }
        this.state = {
            category_id: categoryId,
            color_id: '',
            sortBy: '',
            order: '',
            activePage: 1
        }
        this.categoryColorSortHandler = this.categoryColorSortHandler.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.sortProducts = this.sortProducts.bind(this);
        this.addToCartHandler = this.addToCartHandler.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentWillMount(){
        this.props.loader(true);
        this.props.getAllCategories();
        this.props.getAllColors();
        this.props.getAllProducts(this.state);
        this.props.totalProductCount(this.state);
    }
    categoryColorSortHandler(e){
        this.props.loader(true);
        let name = e.target.name;
        let value = e.target.getAttribute(name);
        this.setState({
            [name]: value
        }, () => {
            this.props.getAllProducts(this.state)
            this.props.totalProductCount(this.state)
        })
    }
    resetFilters(){
        this.props.loader(true);
        this.setState({
            category_id:'',
            color_id: '',
            sortBy: '',
            order: '',
            activePage: 1
        }, () => {
            this.props.getAllProducts(this.state)
            this.props.totalProductCount(this.state)
        });
    }
    sortProducts(e){
        this.props.loader(true);
        let sortBy = e.target.name;
        let order = e.target.getAttribute('orderby');
        this.setState({
            sortBy: sortBy,
            order: order
        }, () => {
            this.props.getAllProducts(this.state)
            this.props.totalProductCount(this.state)
        });
    }
    addToCartHandler(product){
        this.props.loader(true);
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
    componentWillReceiveProps(newProps){
        if(newProps.setFlagForProps){
            this.props.loader(false);
            this.props.setFlagFalse();
        }
        if(newProps.addCartFlag){
            notify.show("Product successfully added to cart", 'success', 1000);
            this.props.setFlagStatus();
            this.props.loader(false);
        }
    }
    handlePageChange(pageNumber){
        this.props.loader(true);
        this.setState({
            activePage: pageNumber
        }, () => {
            this.props.getAllProducts(this.state)
            this.props.totalProductCount(this.state)
            
        })
    }
    render(){
        return(
            <div className="container">
                <Notifications options={{zIndex: 180, top: '90px'}} />
                <div className="row">
                <div className="col-md-3">
                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        <AllCategories allCategories={this.props.allCategories} sortHandler={this.categoryColorSortHandler}/>
                        <AllColors allColors={this.props.allColors} sortHandler={this.categoryColorSortHandler}/>
                    </div>
                </div>
                <AllProductList allProducts={this.props.allProducts} resetFilters={this.resetFilters} sortFunction={this.sortProducts} addToCart={this.addToCartHandler} pageHandler={this.handlePageChange} activePage={this.state.activePage} totalItemsCount={this.props.totalProductCounts}/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        allCategories: state.ProductsDetailReducer.allCategories,
        allColors: state.ProductsDetailReducer.allColors,
        allProducts: state.ProductsDetailReducer.allProducts,
        addCartFlag: state.CartDetailReducer.addCartFlag,
        totalProductCounts: state.ProductsDetailReducer.totalProductCount,
        setFlagForProps: state.ProductsDetailReducer.setFlagForProps
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => { dispatch(getAllCategories()) },
        getAllColors: () => { dispatch(getAllColors()) },
        getAllProducts: (sortParameters) => { dispatch(getAllProducts(sortParameters)) },
        addToCart: (cartData) => { dispatch(addToCart(cartData)) },
        totalProductCount: (param) => { dispatch(totalProductCount(param)) },
        setFlagStatus: () => { dispatch(setFlagStatus()) },
        setFlagFalse: () => { dispatch(setFlagFalse()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAllProduct);