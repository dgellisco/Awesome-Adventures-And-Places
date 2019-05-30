import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return {
        // Type property
        type: ADD_PLACE,
        // Payload property
        placeName: placeName,
        location: location,
        image: image
    }
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
