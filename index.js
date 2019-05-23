/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';


const RNRedux = () => (
    <Provider store={store}>
        <App /> 
    </Provider>
);

// RNRedux expets to get a function that returns JSX
AppRegistry.registerComponent(appName, () => RNRedux);
