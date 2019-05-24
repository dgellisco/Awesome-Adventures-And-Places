// Needed to use and modify JSX
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    placeDeletedHandler = () => {
        // setup in mapDispatchToProps
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop({
            animated: true
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={{ uri: this.props.selectedPlace.image }} style={styles.imageStyle} />
                    <Text style={styles.textStyle}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} name="md-trash" style={styles.iconTrash}/>
                            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}} onPress={this.props.onItemDelete}>
                                DELETE
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
        
};

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: 200
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    container: {
        margin: 22
    },
    deleteButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    iconTrash: {

    }
});

const mapDispatchToProps = dispatch => {
    return {
        // dispatch action
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
}

export default connect(null, mapDispatchToProps)(PlaceDetail);