import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer
});

let composeEnhancers = composeWithDevTools;

// A global variable exposed to you by React-Native if you're in developer mode
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;
}

const configureStore = () => {
    // createStore expects to get a single store
    // Also pass compose enchancer and pass in middleware
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
        );
}

export default configureStore;
