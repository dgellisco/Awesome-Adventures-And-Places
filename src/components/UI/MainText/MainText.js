import React from 'react';
import { StyleSheet, Text } from 'react-native';

const mainText = props => (
    // Styles will cascade among elements only for Text elements within other Text elements.
    <Text style={styles.mainText}>{props.children}</Text>
)

const styles = StyleSheet.create({
    mainText: {
        color: '#bbb',
        backgroundColor: 'transparent'
    }
})

export default mainText;