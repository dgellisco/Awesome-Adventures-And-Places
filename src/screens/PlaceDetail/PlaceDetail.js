// Needed to use and modify JSX
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const placeDetail = props => {
    return (
            <View style={styles.container}>
                <View>
                    <Image source={{ uri: props.selectedPlace.image }} style={styles.imageStyle} />
                    <Text style={styles.textStyle}>{props.selectedPlace.name}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={props.onItemDelete}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} name="md-trash" style={styles.iconTrash}/>
                            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}} onPress={props.onItemDelete}>
                                DELETE
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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

export default placeDetail;