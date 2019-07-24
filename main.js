import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import configureStore from './src/configureStore';
import {Provider} from 'react-redux'

const store = configureStore();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));