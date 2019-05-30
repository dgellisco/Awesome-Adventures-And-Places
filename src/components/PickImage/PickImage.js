import React, { Component } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';

import imagePlaceholder from '../../assets/images/image_nyc.jpg';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    pickedImageHandler = () => {
        ImagePicker.showImagePicker(
            // Arguments
            {title: 'Pick an Image'},
            // Response, error handling
            res => {
                if (res.didCancel) {
                    console.log("User cancelled!");
                } else if (res.error) {
                    console.log("Error!", res.error);
                }
                else {
                    this.setState({
                        pickedImage: { uri: res.uri }
                    })
                    this.props.onImagePicked({ uri: res.uri });
                }
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.imagePreview}/>
                </View>
                <View style={styles.button}>
                    <Button title="Pick Image" onPress={this.pickedImageHandler}/>
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

export default PickImage;
