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
import './public/css/navbar.css';
import './public/css/footer.css';
import './public/css/style.css';
import './public/css/user.css';
import ThankyouPage from './src/components/ThankyouPage';
import LoadingOverlay from 'react-loading-overlay';

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
            console.log(this.state.isActive);
        })
    }
    render() {
        return(
            <LoadingOverlay
                active={this.state.isActive}
                spinner
                text='Loading...'
            >
            <div>
                <Router history={browserHistory}>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path = '/' component = {Banner} />
                            <Route path = '/terms' component = {Terms} />
                            <Route path = '/returnpolicy' component = {ReturnPolicy} />
                            <Route path = '/contact' component = {Contact} />
                            <Route path = '/privacypolicy' component = {PrivacyPolicy} />
                            <Route path = '/locate' component = {LocateUs} />
                            <Route path = '/login' component = {Login} />
                            <Route path = '/register' component = {Register} />
                            <Route path = '/listAllProduct' render={(props) =>  <ListAllProduct loader={this.loaderHandler}/> } />
                            <Route path = '/productDetails/:id' component={ProductDetails} />
                            <Route path = '/orders' render={(props) => (localStorage.getItem('loginstatus') ? <OrderHistory /> : (<Redirect to="/login" />))} />
                            <Route path = '/profile' render={(props) => (localStorage.getItem('loginstatus') ? <Profile /> : (<Redirect to="/login" />))}/>
                            <Route path = '/edit_profile' render={(props) => (localStorage.getItem('loginstatus') ? <EditProfile /> : (<Redirect to="/login" />))}/>
                            <Route path = '/address' render={(props) => (localStorage.getItem('loginstatus') ? <Addresses /> : (<Redirect to="/login" />))}/>
                            <Route path = '/add_address' render={(props) => (localStorage.getItem('loginstatus') ? <AddAddress /> : (<Redirect to="/login" />))}/>
                            <Route path = '/edit_address/:id' render={(props) => (localStorage.getItem('loginstatus') ? <EditAddress {...props}/> : (<Redirect to="/login" />))}/>
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