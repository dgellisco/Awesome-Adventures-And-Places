// Import packages
import React, { Component } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

// Import required actions
import { addPlace, placeAdded, startAddPlace } from '../../store/actions/index';

// Import components
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

// Import input validator utility
import validate from '../../utility/validation'

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentWillMount() {
        this.reset();
    }

    componentDidUpdate() {
        if (this.props.placeAdded) {
            this.props.navigator.switchToTab({tabIndex: 0});
            // this.props.onStartAddPlace();
        }
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                location: {
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }
            }
        })
    }

    // Toggle sidebar
    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                this.props.onStartAddPlace();
            }
        }
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

    // Update state with place name from input
    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        });
    };

    // Update state with location from map
    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            };
        });
    };

    // Update state with image from picker
    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    // On button press, add location to server/store
    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        )
        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
    };

    render() {
        // Submit button
        let submitButton = (
            <Button
                title="Share the Place"
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />
        );

        // Submit button overridden by loading icon
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }

        return (
            <ScrollView>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage
                        onImagePicked={this.imagePickedHandler}
                        ref={ref => (this.imagePicker = ref)}
                    />
                    <PickLocation
                        onLocationPick={this.locationPickedHandler}
                        ref={ref => (this.locationPicker = ref)}
                    />
                    <PlaceInput
                        placeData={this.state.controls.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    },
    imagePreview: {
        height: '100%',
        width: '100%'
    }
})

// Selected state from the store
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    }
}

// Selected actions from the store
const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
        onStartAddPlace: () => dispatch(startAddPlace())
    }
}

// Connect Redux to this component
export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
