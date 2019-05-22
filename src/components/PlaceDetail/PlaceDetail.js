// Needed to use and modify JSX
import React from 'react';
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

const placeDetail = props => {

    let modalContent = null;

    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Image source={{ uri: props.selectedPlace.image }} style={styles.imageStyle} />
                <Text style={styles.textStyle}>{props.selectedPlace.name}</Text>
            </View>
        );
    };

    return (
        <Modal onRequestClose={props.onModalClosed} visible={props.selectedPlace !== null} animationType='slide' >
            <View style={styles.modalContainer}>
                {modalContent}
                <View>
                    <TouchableOpacity onPress={props.onItemDelete}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} name="md-trash" style={styles.iconTrash}/>
                            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}} onPress={props.onItemDelete}>
                                DELETE
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Button title="Close" onPress={props.onModalClose}/>
                </View>
            </View>
        </Modal>
    )
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
    modalContainer: {
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

export default placeDetail;