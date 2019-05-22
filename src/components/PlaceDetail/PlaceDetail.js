// Needed to use and modify JSX
import React from 'react';
import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native';

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
        <Modal onRequestClose={props.onModalClose} visible={props.selectedPlace !== null} animationType='slide' >
            <View style={styles.modalContainer}>
                {modalContent}
                <View>
                    <Button title="Delete" color='red' onPress={props.onItemDelete}/>
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
    }
});

export default placeDetail;