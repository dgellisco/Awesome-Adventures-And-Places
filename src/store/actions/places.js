import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
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
                alert("Something went wrong, please try again!");
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
                alert("Something went wrong, please try again!");
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

export const getPlaces = () => {
    // async code, so we use redux thunk
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

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
}

// Deletes place in firebase
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
            // At this point, you SHOULD create code to re-add the code to the local store if the server delete failed (this code block)
            alert("Something went wrong, please try again!");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log("Done!");
        });
    };
};

// Deletes place in local store
export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};
