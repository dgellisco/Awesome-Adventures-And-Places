import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const defaultInput = props => (
    <TextInput
        underlineColorAndroid="transparent"
        // To pull any props we don't use explicitly declare above.  Includes the placeholder.
        // If a prop from parent overrides one here in the child component, it will REPLACE, not merge with OVERWRITE.
        {...props}
        // To get around that, we can use an array.  It will over-ride by order within the array.
        style={[
            styles.input,
            props.style,
            // if props.valid is not true and touched is true, apply invalid style
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
