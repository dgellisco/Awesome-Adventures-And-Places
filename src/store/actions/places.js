// IMPORT ACTION TYPES
import { PLACE_ADDED, REMOVE_PLACE, SET_PLACES, START_ADD_PLACE } from './actionTypes';
// IMPORT OTHER ACTIONS
import { authGetToken, uiStartLoading, uiStopLoading } from './index';

// EXPORT ACTIONS
export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    }
}

// Add place to server
// Doesnt update store, so does not have a type and a payload.
export const addPlace = (placeName, location, image) => {
    // aSync function, using thunk dispatch
    return dispatch => {
        let authToken;
        // Dispatch loading spinner
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                authToken = token;
                // STEP 1: Store image file
                return fetch('https://us-central1-awesomeadventure-1559175363264.cloudfunctions.net/storeImage',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                })
            })
            // Return error
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            // Or return success
            .then(res => {
                // Helper property that shows us if the response was ok
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error();
                }
            })
            // STEP 2: If image is succesfully stored, store the rest of the data
            .then(parsedRes => {
                // Compile data object together to be stored to firebase
                const placeData = {
                    name: placeName,
                    location: location,
                    // Image URL generated from the backend
                    image: parsedRes.imageUrl,
                    // Image path
                    imagePath: parsedRes.imagePath
                };
                // Store placeData to firebase
                return fetch("https://awesomeadventure-1559175363264.firebaseio.com/places.json?auth=" + authToken,
                {
                    method: "POST",
                    body: JSON.stringify(placeData)
                })
            })
            .then(res => {
                // Helper property that shows us if the response was ok
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error();
                }
            })
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
                dispatch(placeAdded());
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            });
    };
};

export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    }
}

// Retrieve places from the server
export const getPlaces = () => {
    return dispatch => {
        // Dispatch promise function to get token
        dispatch(authGetToken())
            .then(token => {
                // default method is 'GET'
                return fetch(
                    "https://awesomeadventure-1559175363264.firebaseio.com/places.json?auth=" +
                    token
                );
            })
            .catch(() => {
                alert("No valid token found!");
            })
            .then(res => {
                // Helper property that shows us if the response was ok
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error();
                }
            })
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
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
            });
    }
};

// Called from aSync getPlaces
// Updates 'places' in local state
export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

// Delete place on server
export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {      
                // Removes the place locally.
                dispatch(removePlace(key));
                // Removes the place on the server.
                return fetch("https://awesomeadventure-1559175363264.firebaseio.com/places/" + key + ".json?auth=" + token,
                {
                    method: "DELETE"
                })
            })
            .then(res => {
                // Helper property that shows us if the response was ok
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error();
                }
            })
            .then(parsedRes => {
                console.log("Done!");
            })
            .catch(err => {
                // To do: If the delete fails, re-add to the local store (so that store stays the same as server code)
                alert("Something went wrong, please try again!");
                console.log(err);
            })
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
