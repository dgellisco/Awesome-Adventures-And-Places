import React, { Component } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';

import MapView from 'react-native-maps';

class PickLocation extends Component {
    state = {
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
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        })
    }

    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
        }

        return (
            <View style={styles.container}>
                <MapView 
                    initialRegion={this.state.focusedLocation}
                    region={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                >
                {/* The marker is either null, or the focused location */}
                {marker}
                </MapView>
                <View style={styles.button}>
                    <Button
                        title="Locate Me"
                        onPress={() => alert("pick location")}
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