// IMPORT API KEY
import firebaseConfig from '../../../firebase.config'
// IMPORT ACTION TYPES
import { TRY_AUTH } from './actionTypes';
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
                dispatch(uiStopLoading());
                if (parsedRes.error) {
                    alert("Authentication failed - please try again!");
                } else {
                    startMainTabs();
                }
            })
    }
}
