/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'redux;'

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

type Props = {};
export default class App extends Component<Props> {
  state = {
    places: [],
    selectedPlace: null
  };
  
  placeAddedHandler = placeName => {
    this.setState(prevState => {
        return {
         places: prevState.places.concat({
           key: Math.random(),
           name: placeName,
           image: "https://twa.imgix.net/https%3A%2F%2Fsecure.westernaustralia.com%2FSiteCollectionImages%2Fthings%2520to%2520do%2Fsun%2520and%2520sea%2F115243-2.jpg%3FRenditionID%3D3?auto=format&q=75&s=21aa9bd3e9ce04940ff09b69626e5465"
          })
        };
    });
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      };
    });
  
  };

  placeDeletedHandler = () => {
    this.setState(prevState => {
        return {
          // Checked all indexes.  If it is the index to be deleted, it will trigger false and not be added to new array.
          places: prevState.places.filter(place => {
            return place.key !== prevState.selectedPlace.key;
          }),
          selectedPlace: null
        };
      });
  }

  modalCloseHandler = () => {
    this.setState({
      selectedPlace: null
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail  
          selectedPlace={this.state.selectedPlace}
          onItemDelete={this.placeDeletedHandler}
          onModalClose={this.modalCloseHandler}
        />
        <PlaceInput
          onPlaceAdded={this.placeAddedHandler}
        />
        <PlaceList
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
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
