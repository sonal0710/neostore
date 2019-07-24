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
import Cart from './src/components/Cart';
import './public/css/navbar.css';
import './public/css/footer.css';
import './public/css/style.css';
import './public/css/user.css';
// import './public/css/register.css';
// import './public/css/login.css';
// import './public/css/product-list.css';
// import './public/css/product-details.css';
// import './public/css/cart.css';

class App extends Component {
    render() {
        return(
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
                            <Route path = '/listAllProduct' component = {ListAllProduct} />
                            <Route path = '/productDetails/:id' component = {ProductDetails} />
                            <Route path = '/orders' render={(props) => (localStorage.getItem('loginstatus') ? <OrderHistory /> : (<Redirect to="/login" />))} />
                            <Route path = '/profile' render={(props) => (localStorage.getItem('loginstatus') ? <Profile /> : (<Redirect to="/login" />))}/>
                            <Route path = '/edit_profile' render={(props) => (localStorage.getItem('loginstatus') ? <EditProfile /> : (<Redirect to="/login" />))}/>
                            <Route path = '/address' render={(props) => (localStorage.getItem('loginstatus') ? <Addresses /> : (<Redirect to="/login" />))}/>
                            <Route path = '/add_address' render={(props) => (localStorage.getItem('loginstatus') ? <AddAddress /> : (<Redirect to="/login" />))}/>
                            <Route path = '/edit_address/:id' render={(props) => (localStorage.getItem('loginstatus') ? <EditAddress {...props}/> : (<Redirect to="/login" />))}/>
                            <Route path = '/cart' render={(props) => (localStorage.getItem('loginstatus') ? <Cart /> : (<Redirect to="/login" />))}/>
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}
export default App;