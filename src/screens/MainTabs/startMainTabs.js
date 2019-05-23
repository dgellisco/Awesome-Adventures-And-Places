// deliberately named in camelCase, not Proper Case like a React component

import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "awesome-adv-places.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0]
                },
                {
                    screen: "awesome-adv-places.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1]
                }
            ]
        });
    });
};

export default startTabs;

// const startTabs = async () => {
//     Navigation.startTabBasedApp({
//         tabs: [
//             {
//                 // Identified from name given in App.js file
//                 screen: "awesome-adv-places.FindPlaceScreen",
//                 label: "Find Place",
//                 title: "Find Place",
//                 // ES6 async function
//                 icon: await Icon.getImageSource("md-map", 30)
//             },
//             {
//                 screen: "awesome-adv-places.SharePlaceScreen",
//                 label: "Share Place",
//                 title: "Share Place",
//                 // ES6 async function
//                 icon: await Icon.getImageSource("md-share", 30)
//             }
//         ]
//     })
// };