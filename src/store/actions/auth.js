// IMPORT API KEY
import firebaseConfig from '../../../firebase.config'
// IMPORT ACTION TYPES
import { AUTH_SET_TOKEN } from './actionTypes';
// IMPORT COMPONENTS
import { uiStartLoading, uiStopLoading } from './index'
// Import main Navigator function
import startMainTabs from '../../screens/MainTabs/startMainTabs';

// EXPORT ACTION
export const tryAuth = (authData, authMode) => {
    return dispatch => {

        dispatch(uiStartLoading());

        // Set URL for login or signup
        var url = '';
        if (authMode === 'login') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
        } else {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' 
        }

        console.log(url + firebaseConfig.apiKey);

        // Send fetch POST request
        fetch(url + firebaseConfig.apiKey,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // Catch network errors.  No 4xx or 5xx errors caught.
            .catch(err => {
                console.log(err);
                alert("Authentication failed - please try again!");
                dispatch(uiStopLoading());
            })
            // Extract the JSON data that we get back
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
                // If we don't have an idToken, abort login
                if (!parsedRes.idToken) {
                    alert("Authentication failed - please try again!");
                } else {
                    dispatch(authSetToken(parsedRes.idToken));
                    startMainTabs();
                }
            })
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        // Create the promise to get the token
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        // Return the promise
        return promise;
    };
};
