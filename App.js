import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, browserHistory } from 'react-router-dom';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Terms from './src/components/Terms';
import ReturnPolicy from './src/components/ReturnPolicy';
import Contact from './src/components/Contact';
import PrivacyPolicy from './src/components/PrivacyPolicy';
import LocateUs from './src/components/LocateUs';
import Banner from './src/components/Banner';
import Login from './src/components/Login';
import Register from './src/components/Register';
import ProductDetails from './src/components/ProductDetails';
import Profile from './src/components/Profile';
import EditProfile from './src/components/EditProfile';
import Addresses from './src/components/Addresses';
import AddAddress from './src/components/AddAddress';
import EditAddress from './src/components/EditAddress';
import ListAllProduct from './src/components/ListAllProduct';
import OrderHistory from './src/components/OrderHistory';
import CheckoutAddress from './src/components/CheckoutAddress';
import Cart from './src/components/Cart';
import ThankyouPage from './src/components/ThankyouPage';
import CheckoutHeader from './src/components/CheckoutHeader';
import LoadingOverlay from 'react-loading-overlay';
import './public/css/navbar.css';
import './public/css/footer.css';
import './public/css/style.css';
import './public/css/user.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            isActive:false
        }
        this.loaderHandler = this.loaderHandler.bind(this);
    }
    loaderHandler(flag){
        this.setState({
            isActive: flag
        }, () => {
            // console.log(this.state.isActive);
        })
    }
    render() {
        let HideHeader = '';
        if ((window.location.pathname !== '/thankyou') && (window.location.pathname !== '/checkaddress')){
            HideHeader = <Header/>  
        }else{
            HideHeader = <CheckoutHeader/>
        }
        return(
            <LoadingOverlay
                active={this.state.isActive}
                spinner
                text='Loading...'
            >
            <div>
                <Router history={browserHistory}>
                    <div>
                        {HideHeader}
                        <Switch>
                            <Route exact path = '/' render={(props) =>  <Banner loader={this.loaderHandler}/> } />
                            <Route path = '/terms' component = {Terms} />
                            <Route path = '/returnpolicy' component = {ReturnPolicy} />
                            <Route path = '/contact' component = {Contact} />
                            <Route path = '/privacypolicy' component = {PrivacyPolicy} />
                            <Route path = '/locate' component = {LocateUs} />
                            <Route path = '/login' component = {Login} />
                            <Route path = '/register' component = {Register} />
                            <Route path = '/listAllProduct' render={(props) =>  <ListAllProduct {...props} loader={this.loaderHandler}/> } />
                            <Route path = '/productDetails/:id' render={(props) =>  <ProductDetails {...props} loader={this.loaderHandler}/> }  />
                            <Route path = '/orders' render={(props) => (localStorage.getItem('loginstatus') ? <OrderHistory loader={this.loaderHandler}/> : (<Redirect to="/login" />))} />
                            <Route path = '/profile' render={(props) => (localStorage.getItem('loginstatus') ? <Profile loader={this.loaderHandler}/> : (<Redirect to="/login" />))}/>
                            <Route path = '/edit_profile' render={(props) => (localStorage.getItem('loginstatus') ? <EditProfile loader={this.loaderHandler}/> : (<Redirect to="/login" />))}/>
                            <Route path = '/address' render={(props) => (localStorage.getItem('loginstatus') ? <Addresses loader={this.loaderHandler} /> : (<Redirect to="/login" />))}/>
                            <Route path = '/add_address' render={(props) => (localStorage.getItem('loginstatus') ? <AddAddress {...props} loader={this.loaderHandler} /> : (<Redirect to="/login" />))}/>
                            <Route path = '/edit_address/:id' render={(props) => (localStorage.getItem('loginstatus') ? <EditAddress {...props} loader={this.loaderHandler}/> : (<Redirect to="/login" />))}/>
                            <Route path = '/cart' render={(props) => (localStorage.getItem('loginstatus') ? <Cart loader={this.loaderHandler}/> : (<Redirect to="/login" />))}/>
                            <Route path = '/checkaddress' render={(props) => (localStorage.getItem('loginstatus') ? <CheckoutAddress loader={this.loaderHandler}/> : (<Redirect to="/login" />))}/>
                            <Route path = '/thankyou' component = {ThankyouPage} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
            </LoadingOverlay>
        );
    }
}
export default App;