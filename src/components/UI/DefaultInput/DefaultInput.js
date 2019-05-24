import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const defaultInput = props => (
    <TextInput
        underlineColorAndroid="transparent"
        // To pull any props we don't use explicitly declare above.  Includes the placeholder.
        // If a prop from parent overrides one here in the child component, it will REPLACE, not merge with OVERWRITE.
        {...props}
        // To get around that, we can use an array.  It will over-ride by order within the array.
        style={[styles.input, props.style]}
    />
);

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        margin: 8
    }
})

export default defaultInput;
