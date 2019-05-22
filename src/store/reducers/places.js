import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
};

// Takes the state and the action
// state = initialState, means that if state does not exist, it will use the initialState
// Always return a brand new state
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random().toString(),
                    name: action.placeName,
                    image: "https://twa.imgix.net/https%3A%2F%2Fsecure.westernaustralia.com%2FSiteCollectionImages%2Fthings%2520to%2520do%2Fsun%2520and%2520sea%2F115243-2.jpg%3FRenditionID%3D3?auto=format&q=75&s=21aa9bd3e9ce04940ff09b69626e5465"
                })
            };

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== state.selectedPlace.key;
                }),
                selectedPlace: null
            };
        
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => {
                    return place.key === action.placeKey;
                })
            };
        
        case DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            };

        default:
            return state;
    }
};

export default reducer;