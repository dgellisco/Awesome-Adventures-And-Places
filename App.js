import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

// Register Screens
// Arguments (identified/name, function to load screen)
Navigation.registerComponent("awesome-adv-places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("awesome-adv-places.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("awesome-adv-places.FindPlaceScreen", () => FindPlaceScreen);

// Start an App
Navigation.startSingleScreenApp({
    screen: {
        screen: "awesome-adv-places.AuthScreen",
        title: "Login"
    }
});
