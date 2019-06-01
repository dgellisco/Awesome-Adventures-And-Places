import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const defaultInput = props => (
    <TextInput
        underlineColorAndroid="transparent"
        // To pull any props we don't use explicitly declare above.  Includes the placeholder.
        {...props}
        // The last style in this array will take precedence.
        style={[
            // Lowest priority CSS
            styles.input,
            props.style,
            // Highest priority CSS
            !props.valid && props.touched ? styles.invalid : null
        ]}
    />
);

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red'
    }
})

export default defaultInput;
