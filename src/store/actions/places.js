import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        // Dispatch loading spinner
        dispatch(uiStartLoading());
        // Store image
        fetch('https://us-central1-awesomeadventure-1559175363264.cloudfunctions.net/storeImage',
            {
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                })
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            // If image is succesfully stored, store the rest of the data
            .then(parsedRes => {
                // Compile data object together to be stored to firebase
                const placeData = {
                    name: placeName,
                    location: location,
                    // Image URL generated from the backend
                    image: parsedRes.imageUrl
                };
                // Store placeData to firebase
                return fetch("https://awesomeadventure-1559175363264.firebaseio.com/places.json",
                {
                    // Require method and body of http fetch request
                    method: "POST",
                    body: JSON.stringify(placeData)
                })
            })
            // Return error
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            })
            // Or return success
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
            })
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
