/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/store/configureStore';

// Execute the function, which returns the store (loaded with the root reducer)
// You could also pass extra configuration at this stage
const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <App /> 
    </Provider>
);

// RNRedux expets to get a function that returns JSX
AppRegistry.registerComponent(appName, () => RNRedux);
