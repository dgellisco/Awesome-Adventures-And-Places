// IMPORT ACTION TYPES
import { TRY_AUTH } from './actionTypes';

// EXPORT ACTION
export const tryAuth = (authData) => {
    return {
        type: TRY_AUTH,
        authData: authData
    }
}
