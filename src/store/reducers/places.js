// Import action types
import { SET_PLACES, REMOVE_PLACE } from '../actions/actionTypes';

// Set some amount of initialState
const initialState = {
    places: []
};

// Reducer - takes the previous state, processes actions, and returns a new state object
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PLACES:
            return {
                ...state,
                places: action.places
            };

        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.key;
                })
            };
        
        default:
            return state;
    }
};

export default reducer;