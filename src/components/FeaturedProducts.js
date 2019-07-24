import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeaturedProducts extends Component {
    render() {
        return( 
                <div className="row">
                    {(this.props.featured_products !== undefined) && this.props.featured_products.product.map((productDetails, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="thumbnail">
                            <div className="img-thumb featured-img">
                                <img src={process.env.REACT_APP_API_URL+"/"+productDetails.products.product_image[0]} className="img img-responsive"/>
                            </div>
                            <div className="caption">
                                <h4 className="text-center"><Link to={"/productDetails/"+productDetails.products._id}>{productDetails.products.product_name}</Link></h4>
                                <h4 className="text-center">₹ {productDetails.products.product_cost}</h4>
                                <div className="text-center">
                                <i className="fa fa-lg fa-star"></i>
                                <i className="fa fa-lg fa-star"></i>
                                <i className="fa fa-lg fa-star"></i>
                                <i className="fa fa-lg fa-star-o"></i>
                                <i className="fa fa-lg fa-star-o"></i>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
        )
    }
}

export default FeaturedProducts;