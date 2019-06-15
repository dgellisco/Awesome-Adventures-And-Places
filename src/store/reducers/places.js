// Import action types
import { PLACE_ADDED, REMOVE_PLACE, SET_PLACES, START_ADD_PLACE } from '../actions/actionTypes';

// Set some amount of initialState
const initialState = {
    places: [],
    placeAdded: false
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
        
        case START_ADD_PLACE:
            return {
                ...state,
                placeAdded: false
            };

        case PLACE_ADDED:
            return {
                ...state,
                placeAdded: true
            };

        default:
            return state;
    }
};

export default reducer;