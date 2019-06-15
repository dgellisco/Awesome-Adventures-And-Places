import React, { Component } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {

    componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            // Set initial location
            focusedLocation: {
                latitude: 39.739235,
                longitude: -104.990250,
                latitudeDelta: 0.0122,
                // Get the aspect ratio, multiply by latDelta
                longitudeDelta:
                    Dimensions.get('window').width /
                    Dimensions.get('window').height *
                    0.0122
            },
            locationChosen: false
        })
    } 

    // Updates location on map (animated) and location details in state
    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            // Override lat and long
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        // Update local state (not Redux)
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
        // Update Redux state
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    };

    // Function for 'find my location'
    getLocationHandler = () => {
        // Find current location
        navigator.geolocation.getCurrentPosition(pos => {
            // Update current location details
            // Recreate object data structure fed to pickLocationHandler, so that we can reuse that function
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
        error => {
            console.log(error);
            alert('Fetching the position failed, please pick one manually')
        })
    };

    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
        }

        return (
            <View style={styles.container}>
                <MapView 
                    initialRegion={this.state.focusedLocation}
                    region={!this.state.locationChosen ? this.state.focusedLocation : null}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    // ref is a default React feature
                    // This is required to identify this map to perform it's functions
                    // It creates a property within this class which contains a reference (this.map) to this element
                    ref={ref => this.map = ref}
                >
                {/* The marker is either null, or the focused location */}
                {marker}
                </MapView>
                <View style={styles.button}>
                    <Button
                        title="Locate Me"
                        onPress={this.getLocationHandler}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    }
})

export default PickLocation;
