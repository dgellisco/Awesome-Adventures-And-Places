import { SET_PLACES } from '../actions/actionTypes';

const initialState = {
    places: []
};

// Takes the state and the action
// state = initialState, means that if state does not exist, it will use the initialState
// Always return a brand new state
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PLACES:
            return {
                ...state,
                places: action.places
            };

        // case DELETE_PLACE:
        //     return {
        //         ...state,
        //         places: state.places.filter(place => {
        //             return place.key !== action.placeKey;
        //         })
        //     };
        
        default:
            return state;
    }
};

export default reducer;