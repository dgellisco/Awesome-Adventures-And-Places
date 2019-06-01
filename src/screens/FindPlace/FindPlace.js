// Import packages
import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
// Import required component
import PlaceList from '../../components/PlaceList/PlaceList';
// Import requried actions
import { getPlaces } from '../../store/actions/index'

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    // Lifecyle handler
    componentDidMount() {
        // Calls getPlaces action from mapDispatchToProps
        // Load all places from server
        this.props.onLoadPlaces();
    }

    // Sidebar toggle
    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    // Places loaded animation
    placesLoadedHandler = () => {
        // Fades places in
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    // Load places animation
    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            // This code block (passed to start function) is executed upon completion of 'start'
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    };

    // On click of place, push a navigator screen on top, displays place detail
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        this.props.navigator.push({
            screen: "awesome-adv-places.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    }

    render () {
        let content = (
            // Special view, by Animated API
            <Animated.View
                style={{
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            // Switches fade into background to fade to foreground
                            scale: this.state.removeAnim.interpolate({
                                // The values inputted
                                inputRange: [0, 1],
                                // The values outputted/rendered
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }}
            >
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>
                            FIND PLACES
                        </Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        // Renders the PlaceList component, which itself contains display of each individual place
        if (this.state.placesLoaded) {
            content = (
                <Animated.View style={{
                    opacity: this.state.placesAnim
                }}>
                    <PlaceList
                        places={this.props.places}
                        onItemSelected={this.itemSelectedHandler}
                    />
                </Animated.View>
            )
        }

        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 26
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
