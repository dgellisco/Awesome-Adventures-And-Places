// deliberately named in camelCase, not Proper Case like a React component

import { Navigation } from 'react-native-navigation';

const startTabs = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                // Identified from name given in App.js file
                screen: "awesome-adv-places.FindPlaceScreen",
                label: "Find Place",
                title: "Find Place"
            },
            {
                screen: "awesome-adv-places.SharePlaceScreen",
                label: "Share Place",
                title: "Share Place"
            }
        ]
    });    
};

export default startTabs;