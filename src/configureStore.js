import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import reduxImmmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmmutableStateInvariant())
  );
}