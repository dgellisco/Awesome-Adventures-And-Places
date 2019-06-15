// Import action types
import { UI_START_LOADING, UI_STOP_LOADING } from './actionTypes';

// Export action
export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

// Export action
export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};
