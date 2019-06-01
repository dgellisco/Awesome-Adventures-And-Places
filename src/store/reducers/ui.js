// Import action types
import { UI_START_LOADING, UI_STOP_LOADING } from '../actions/actionTypes';

// Set some amount of initialState
const initialState = {
    isLoading: false
};

// Reducer - takes the previous state, processes actions, and returns a new state object
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
