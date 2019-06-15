// Import packages
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// Import reducers
import authReducer from './reducers/auth';
import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';

// Compile all reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    places: placesReducer,
    ui: uiReducer
});

// DEVTOOLS
let composeEnhancers = composeWithDevTools;
// A global variable exposed by React-Native when in developer mode
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;
}

// Function to create store with root reducer
const configureStore = () => {
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
        );
}

export default configureStore;
