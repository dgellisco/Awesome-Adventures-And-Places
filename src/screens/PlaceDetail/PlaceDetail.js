// Import packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
// Import actions
import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    state = {
        viewMode: 'portrait'
    }

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles)
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    };

    // Delete place button function
    placeDeletedHandler = () => {
        // Call delete action from mapDispatchToProps
        this.props.onDeletePlace(this.props.selectedPlace.key);
        // Return to previous navigation view
        // this.props.navigator.pop({
        //     animated: true
        // });
        this.props.navigator.pop();
    }
    
    render() {
        return (
            <View style={
                [styles.container,
                this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer
                ]
            }>
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image source={this.props.selectedPlace.image} style={styles.imageStyle} />
                    </View>

                    <View style={styles.subContainer}>
                        <MapView
                            initialRegion={{
                                ...this.props.selectedPlace.location,
                                latitudeDelta: 0.0122,
                                // Get the aspect ratio, multiply by latDelta
                                longitudeDelta:
                                    Dimensions.get('window').width /
                                    Dimensions.get('window').height *
                                    0.0122
                            }}
                            style={styles.map}
                        >
                            <MapView.Marker coordinate={this.props.selectedPlace.location} />
                        </MapView>
                    </View>

                </View>

                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeNameStyle}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    size={30}
                                    name={Platform.OS === 'android' ? "md-trash" : "ios-trash"}
                                    color="red"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
        
};

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    map: {
        // ensures this will fill the object around it
        ...StyleSheet.absoluteFillObject
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    placeNameStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    deleteButton: {
        alignItems: 'center'
    },
    subContainer: {
        flex: 1
    },
    placeDetailContainer: {
        flex: 2
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    };
}

export default connect(null, mapDispatchToProps)(PlaceDetail);