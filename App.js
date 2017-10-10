import React, { Component } from 'react';
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FBSDK, { LoginManager, LoginButton } from 'react-native-fbsdk';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { Button } from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
componentWillMount(){
  GoogleSignin.configure({
    iosClientId: '780959457134-dnuvneiv5mamepr2ssp3e9ssj41vnmpv.apps.googleusercontent.com' // only for iOS
    })
  }

  fbAuth(){
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
      console.log(result);
      if(result.isCancelled){
        console.log('Login cancelled');
      }else{
        console.log('Login success '+ result.grantedPermissions);
      }
    },function(error){
      console.log('An error Occured' + error);
    })
  }
  googleLogin(){
    GoogleSignin.signIn().then((user) => {
      console.log(user);
    }).catch((err) => {
      console.log('WRONG SIGNIN', err);
    }).done();
  }

  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{width: 210, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this.googleLogin}/>
        {/* <Button
          onPress={this.fbAuth}
          size={FBSDK.LoginButton.defaultProps.style}
          color={FBSDK.LoginButton.defaultProps}
          title='Login with Fb'
          color='#4267B2'/> */}
          <LoginButton
            style={{width: 200, height: 40}}
             publishPermissions={['publish_actions']}
             onLoginFinished={
               (error, result) => {
                if (error) {
                     alert('Login failed with error: ' + result.error);
                 } else if (result.isCancelled) {
                     alert('Login was cancelled');
                 } else {
                     alert('Login was successful with permissions: '
                         + result.grantedPermissions)
                 }
              }
            }
              onLogoutFinished={() => alert('User logged out')} />

{/*
        <TouchableOpacity onPress={this.fbAuth}>
          <Text>
            Login with facebook
          </Text>
        </TouchableOpacity> */}

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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
