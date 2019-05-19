/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';

type Props = {};
export default class App extends Component<Props> {
  state = {
    places: []
  };
  
  placeAddedHandler = placeName => {
    this.setState(prevState => {
        return {
         places: prevState.places.concat(placeName)
        };
    });
  }

  placeDeletedHandler = index => {
    this.setState(prevState => {
      return {
        // Checked all indexes.  If it is the index to be deleted, it will trigger false and not be added to new array.
        places: prevState.places.filter((place, i) => {
          return i !== index;
        })
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput
          onPlaceAdded={this.placeAddedHandler}
        />
        <PlaceList
          places={this.state.places}
          onItemDeleted={this.placeDeletedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
