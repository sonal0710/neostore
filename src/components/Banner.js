import React, { Component } from 'react';
import FeaturedProducts from './FeaturedProducts';
import { getBanners, getFeturedProductList } from '../actions/HomePageAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Banner extends Component {
    componentWillMount(){
        this.props.loader(true);
        this.props.getBanners();
        this.props.getFeturedProductList();
    }
    componentWillReceiveProps(){
        this.props.loader(false);
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="carousel-holder">
                        <div  id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators" >
                            {(this.props.banners !== undefined) && this.props.banners.product.map((bannerDetails, i) => (
                                <li data-target="#carousel-example-generic" key={i} data-slide-to={i} className={(i === 0) ? "active" : ""}></li>
                            ))}
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            {(this.props.banners !== undefined) && this.props.banners.product.map((bannerDetails, i) => (
                                <div className={(i === 0) ? "item active":"item"} key={i}>
                                    <Link to={{
                                        pathname: "/listAllProduct",
                                        state: {
                                            category_id: bannerDetails._id
                                        }
                                    }}><img className="slide-image" src={process.env.REACT_APP_API_URL+"/"+bannerDetails.category_image} alt=""/></Link>
                                    <div className="carousel-caption">
                                        <h4>{bannerDetails.category_name.charAt(0).toUpperCase() + bannerDetails.category_name.slice(1)}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                        </a>
                        <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </a>
                        </div>
                    </div>
                </div>
                <h3 className="text-center">Popular Products <small><Link to="/listAllProduct" >--view all</Link></small></h3>
                <FeaturedProducts featured_products={this.props.featuredProducts}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        banners: state.HomePageReducer.banners,
        featuredProducts: state.HomePageReducer.featuredProducts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBanners: () => { dispatch(getBanners()) },
        getFeturedProductList: () => { dispatch(getFeturedProductList()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Banner);