import React, { Component } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import MainText from '../../components/UI/MainText/MainText'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

import backgroundImage from '../../assets/images/auth-background.jpg';

class AuthScreen extends Component {
    state = {
        // Initiliazes view mode
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
    }

    constructor(props) {
        super(props);
        // Listens for view mode changes
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

    loginHandler = () => {
        startMainTabs();
    }

    render () {
        let headingText = null;

        if (this.state.viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        return (
            <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground onPress={() => alert('ello')} color='#29aaf4'>
                        Switch To Login
                    </ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder='Your E-Mail Address' style={styles.input} />
                        <View style={
                            this.state.viewMode === 'portrait'
                                ? styles.portraitPasswordContainer
                                : styles.landscapePasswordContainer
                        }>
                            <View style={
                                this.state.viewMode === 'portrait'
                                    ? styles.portraitPasswordWrapper
                                    : styles.landscapePasswordWrapper
                            }>
                                <DefaultInput placeholder='Password' style={styles.input} />
                            </View>
                            <View style={
                                this.state.viewMode === 'portrait'
                                    ? styles.portraitPasswordWrapper
                                    : styles.landscapePasswordWrapper
                            }>
                                <DefaultInput placeholder='Confirm Password' style={styles.input} />
                            </View>
                        </View>
                    </View>
                    <ButtonWithBackground onPress={this.loginHandler} color='#29aaf4'>
                        Submit
                    </ButtonWithBackground>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    // Place various styles within the StyleSheet mode to take advantage of all that optimisation
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordWrapper: {
        width: '45%'
    },
    portraitPasswordWrapper: {
        width: '100%'
    }
})

export default AuthScreen;
