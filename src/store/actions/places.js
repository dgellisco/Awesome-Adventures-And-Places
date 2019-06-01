// IMPORT ACTION TYPES
import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
// IMPORT OTHER ACTIONS
import { uiStartLoading, uiStopLoading } from './index';

// EXPORT ACTIONS
// Add place to server
// Doesnt update store, so does not have a type and a payload.
export const addPlace = (placeName, location, image) => {
    // aSync function, using thunk dispatch
    return dispatch => {
        // Dispatch loading spinner
        dispatch(uiStartLoading());
        // STEP 1: Store image file
        fetch('https://us-central1-awesomeadventure-1559175363264.cloudfunctions.net/storeImage',
            {
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                })
            })
            // Return error
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            // Or return success
            .then(res => res.json())
            // STEP 2: If image is succesfully stored, store the rest of the data
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
                    method: "POST",
                    body: JSON.stringify(placeData)
                })
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
            })
    };
};

// Retrieve places from the server
export const getPlaces = () => {
    return dispatch => {
        // default method is 'GET'
        fetch("https://awesomeadventure-1559175363264.firebaseio.com/places.json")
        .catch(err => {
            alert("Something went wrong, please try again!");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            // change object to array
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    // Distribute property of each key
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    // Add the key as an additional key/value pair, to store ID
                    key: key
                })
            }
            dispatch(setPlaces(places));
        });
    }
};

// Called from aSync getPlaces
// Updates 'places' in local state
export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
}

// Delete place on server
export const deletePlace = (key) => {
    return dispatch => {
        // Removes the place locally.
        dispatch(removePlace(key));
        // Removes the place on the server.
        fetch("https://awesomeadventure-1559175363264.firebaseio.com/places/" + key + ".json",
        {
            method: "DELETE"
        })
        .catch(err => {
            // To do: If the delete fails, re-add to the local store (so that store stays the same as server code)
            alert("Something went wrong, please try again!");
            console.log(err);
        })
        .then(res => res.json())
        .then(() => {
            console.log("Done!");
        });
    };
};

// Called from aSync deletePlace
// Deletes 'place' in local state
export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};
