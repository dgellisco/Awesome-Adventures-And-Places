// Import main App file
import App from "../../../App";
// IMPORT REACT-NATIVE
import { AsyncStorage } from 'react-native';
// IMPORT API KEY
import firebaseConfig from '../../../firebase.config'
// IMPORT ACTION TYPES
import { AUTH_REMOVE_TOKEN, AUTH_SET_TOKEN } from './actionTypes';
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
                    dispatch(
                        authStoreToken(
                            parsedRes.idToken,
                            parsedRes.expiresIn,
                            parsedRes.refreshToken
                        )
                    );
                    startMainTabs();
                }
            });
    };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        // Store token locally in state
        dispatch(authSetToken(token));
        // Get expiry date of token.
        const now = new Date();
        const expiryDate = now.getTime() + ( expiresIn * 1000 );
        // Store token locally in react-native, for persistent login
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    }
};

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        // Create the promise to get the token
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                let fetchedToken;
                // If there's no token in redux, see if token is in aSync storage
                AsyncStorage.getItem("ap:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        // Check if token exists
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        // Retrieve expiryDate from storage
                        return AsyncStorage.getItem("ap:auth:expiryDate");
                    })
                    // Check if expiryDate has passed
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        // If expiry date is in the future, set the token from aSync storage
                        if (parsedExpiryDate > now) {
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken)
                        // Otherwise, token is invalid.  Reject.
                        } else {
                            reject();
                        }
                    })
            } else {
                resolve(token);
            }
        });
        // If promise fails, run this code
        return promise
            .catch(err => {
            // Try to get refreshToken
            return AsyncStorage.getItem("ap:auth:refreshToken")
                .then(refreshToken => {
                    return fetch('https://securetoken.googleapis.com/v1/token?key=' + firebaseConfig.apiKey, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token=" + refreshToken
                    })
                })
                .then(res => console.log(res))
                .then(parsedRes => {
                    if (parsedRes.id_token) {
                        console.log("Refresh token worked!");
                        dispatch(
                            authStoreToken(
                                parsedRes.id_token,
                                parsedRes.expires_in,
                                parsedRes.refresh_token
                            )
                        );
                        return parsedRes.id_token;
                    } else {
                        // Clear aSync storage
                        dispatch(authClearStorage());
                    }
                })
            .then(token => {
                if (!token) {
                    throw new Error();
                } else {
                    return token;
                }
            })
        });
    };
};

// Sign user in automatically if they have a valid token
export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
            })
            .catch(err => console.log("Failed to fetch token!"));
    };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");
        return AsyncStorage.removeItem("ap:auth:refreshToken");
    }
}

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            // Susbcribe to async promise of authClearStorage
            .then(() => {
                App();
            })
        dispatch(authRemoveToken());
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}
