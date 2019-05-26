import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';

// Execute the function, which returns the store (loaded with the root reducer)
// You could also pass extra configuration at this stage
const store = configureStore();

// Register Screens
// Arguments (1 is identified/name, 2 is function to load screen, 3 & 4 is redux)
Navigation.registerComponent(
    "awesome-adv-places.AuthScreen",
    () => AuthScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "awesome-adv-places.SharePlaceScreen",
    () => SharePlaceScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "awesome-adv-places.FindPlaceScreen",
    () => FindPlaceScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "awesome-adv-places.PlaceDetailScreen",
    () => PlaceDetailScreen,
    store,
    Provider
)

Navigation.registerComponent(
    "awesome-adv-places.SideDrawer",
    () => SideDrawer
);

// Start an App
Navigation.startSingleScreenApp({
    screen: {
        screen: "awesome-adv-places.AuthScreen",
        title: "Login"
    }
});
