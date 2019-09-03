import React from 'react';
import {
  View, Text, StyleSheet, Alert, Button, ActivityIndicator,
} from 'react-native';
import * as Expo from 'expo';
import firebase from 'firebase';
import firebaseConfig from './config';
firebase.initializeApp(firebaseConfig);


export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entering:false,
    };
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = googleUser => {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!this.isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(){
        console.console.log('user signed in');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  }.bind(this));
}

  signInWithGoogleAsync = async () => {
    this.setState({
      entering: true
    });
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '553884378564-le9276vg4q3adfhlr4ss3hktgols45tm.apps.googleusercontent.com',
        iosClientId: '553884378564-mmg1ak77r14gt59q63jhf628uthr4ejd.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        this.setState({
          entering: false,
        });
        return { cancelled: true };
      }
    } catch (e) {
      this.setState({
        entering: false,
      });
      return { error: true };
    }
  }
  render() {
    if(!this.state.entering){
      return(
        <View style = {styles.container}>
          <Button title='Entrar' onPress={()=> this.signInWithGoogleAsync()}/>
        </View>
      );
    }else{
      return(
        <View style = {styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

  }
}

LoginScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#rgb(255,255,255)',
  },
});
