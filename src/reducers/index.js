import { combineReducers } from 'redux';
import HomePageReducer from './HomePageReducer';
import UserLoginReducer from './UserLoginReducer';
import ProductsDetailReducer from './ProductsDetailReducer';
import UserProfileReducer from './UserProfileReducer';
import CartDetailReducer from './CartDetailReducer';

const rootReducer = combineReducers({
  HomePageReducer,
  UserLoginReducer,
  ProductsDetailReducer,
  UserProfileReducer,
  CartDetailReducer
})

export default rootReducer;