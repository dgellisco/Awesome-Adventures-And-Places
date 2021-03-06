// Import packages
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { connect } from 'react-redux';
// Import actions
import { authAutoSignIn, tryAuth } from '../../store/actions/index';
// Import components
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import MainText from '../../components/UI/MainText/MainText'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
// Import static elements
import backgroundImage from '../../assets/images/auth-background.jpg';
// Import input validation logic
import validate from '../../utility/validation';

class AuthScreen extends Component {
    state = {
        // Initializes view mode
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        // Default mode - login, or signup
        authMode: 'login',
        // Sets default data object structure
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            },
        }
    }

    constructor(props) {
        super(props);
        // Listens for view mode changes
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    componentDidMount() {
        this.props.onAutoSignIn();
    }

    // Switch between login or signup
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        });
    };

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

    // Login button pressed function - pass auth data to onTryAuth action
    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.onTryAuth(authData, this.state.authMode);
    }

    // Update state with input entry
    updateInputState = (key, value) => {
        let connectedValue = {};

        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }

        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password'
                            ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    }

    render () {
        let headingText = null;
        let confirmPasswordControl = null;
        
        let submitButton = (
            <ButtonWithBackground
                onPress={this.authHandler}
                color='#29aaf4'
                disabled={
                    !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' ||
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid}
            >
                Submit
            </ButtonWithBackground>
        );

        if (this.state.viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={
                    this.state.viewMode === 'portrait'
                        ? styles.portraitPasswordWrapper
                        : styles.landscapePasswordWrapper
                }>
                    <DefaultInput
                        placeholder='Confirm Password'
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            )
        }

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior='padding'
                >
                    {headingText}
                    <ButtonWithBackground
                        onPress={this.switchAuthModeHandler}
                        color='#29aaf4'>
                        Switch To {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
                    </ButtonWithBackground>
                    {/* Whenever anywhere other than the input fields or buttons is pressed,
                    the keyboard will be dismissed */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput
                                placeholder='Your E-Mail Address'
                                style={styles.input}
                                value={this.state.controls.email.value}
                                onChangeText={(val) => this.updateInputState('email', val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'
                            />
                            <View style={
                                this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                                    ? styles.portraitPasswordContainer
                                    : styles.landscapePasswordContainer
                            }>
                                <View style={
                                    // When in signup and landscape mode, place the two password fields on one line
                                    this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                                        ? styles.portraitPasswordWrapper
                                        : styles.landscapePasswordWrapper
                                }>
                                    <DefaultInput
                                        placeholder='Password'
                                        style={styles.input}
                                        value={this.state.controls.password.value}
                                        onChangeText={(val) => this.updateInputState('password', val)}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        // Boolean, treated as true.  Same as secureTextEntry={true}
                                        secureTextEntry
                                    />
                                </View>
                                {confirmPasswordControl}
                            </View>
                            
                        </View>
                    </TouchableWithoutFeedback>
                    {submitButton}                            
                </KeyboardAvoidingView>
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
