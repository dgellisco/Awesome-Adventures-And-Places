// Import: Packages
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
// Import: Components
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
// Import: Redux store configuration
import configureStore from './src/store/configureStore';

// REDUX
// Function that returns the store (loaded with the root reducer)
// You can also pass extra configuration at this stage
const store = configureStore();

// REACT-NATIVE NAVIGATION
// Register Screens
Navigation.registerComponent(
    // Identifier/name
    "awesome-adv-places.AuthScreen",
    // Function to load screen
    () => AuthScreen,
    // Load the store, to give access to redux
    store,
    // Load the provider, to give access to redux
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
    () => SideDrawer,
    store,
    Provider
);

// Start an App
export default () => Navigation.startSingleScreenApp({
    screen: {
        screen: "awesome-adv-places.AuthScreen",
        title: "Login"
    }
});
