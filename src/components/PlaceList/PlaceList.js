import React from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = props => {

    // Return multiple 'ListItem' components within a View component
    return (
        <FlatList
            style={styles.listContainer}
            // Must be an array of objects, not a simple array
            data={props.places}
            renderItem={(info) => (
                <ListItem
                    placeName={info.item.value}
                    onItemPressed={() => props.onItemDeleted(info.item.key)}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    }
});

export default placeList;
