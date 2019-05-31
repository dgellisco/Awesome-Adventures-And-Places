import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location
        }
        // Use firebase URL
        // Add JSON location to save
        fetch("https://awesomeadventure-1559175363264.firebaseio.com/places.json",
        {
                // Require method and body of http fetch request
                method: "POST",
                body: JSON.stringify(placeData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        })
    };

    // return {
    //     // Type property
    //     type: ADD_PLACE,
    //     // Payload properties
    //     placeName: placeName,
    //     location: location,
    //     image: image
    // }
    
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
