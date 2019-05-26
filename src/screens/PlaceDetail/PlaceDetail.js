// Needed to use and modify JSX
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
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

    placeDeletedHandler = () => {
        // setup in mapDispatchToProps
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop({
            animated: true
        });
    }
    
    render() {
        return (
            <View style={
                [styles.container,
                this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer
                ]
            }>
                <View style={styles.subContainer}>
                    <Image source={{ uri: this.props.selectedPlace.image }} style={styles.imageStyle} />
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
    imageStyle: {
        width: '100%',
        height: 200
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
    }
});

const mapDispatchToProps = dispatch => {
    return {
        // dispatch action
        onDeletePlace: key => dispatch(deletePlace(key))
    };
}

export default connect(null, mapDispatchToProps)(PlaceDetail);