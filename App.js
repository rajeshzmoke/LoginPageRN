/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

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

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.fbAuth}>
          <Text>
            Login with facebook
          </Text>
        </TouchableOpacity>
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
