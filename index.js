/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

// Wrap App component with Redux provider.  Pass store to provider.
const RNRedux = () => (
    <Provider store={store}>
        <App /> 
    </Provider>
);

// Register App component
AppRegistry.registerComponent(appName, () => RNRedux);
