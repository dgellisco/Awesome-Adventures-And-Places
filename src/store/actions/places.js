import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName) => {
    return {
        // Type property
        type: ADD_PLACE,
        // Payload property
        placeName: placeName
    }
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
