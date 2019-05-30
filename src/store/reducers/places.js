import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
    places: []
};

// Takes the state and the action
// state = initialState, means that if state does not exist, it will use the initialState
// Always return a brand new state
const reducer = (state = initialState, action) => {
    console.log("action", action.location);
    console.log("action", action);
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random().toString(),
                    name: action.placeName,
                    image: {
                        uri: action.image.uri
                    },
                    location: action.location
                }),
            };

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.placeKey;
                })
            };
        
        default:
            return state;
    }
};

export default reducer;