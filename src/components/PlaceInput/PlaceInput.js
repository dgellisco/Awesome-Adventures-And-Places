import React, { Component } from 'react';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

placeInput = props => (
    <DefaultInput
        placeholder="Place Name"
        value={props.placeName}
        onChangeText={props.onChangeText}
    />
);

export default placeInput;