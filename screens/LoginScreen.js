import React from 'react';
import {
  View, Text, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity,
} from 'react-native';
import * as Expo from 'expo';
import firebase from 'firebase';
import firebaseConfig from './config';
import Colors from '../constants/Colors';
import * as Font from 'expo-font';
firebase.initializeApp(firebaseConfig);


export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entering:false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'RalewayRegular': require('../assets/fonts/Raleway-Regular.ttf'),
    });
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

      if (result.type === 'success' && ((result.user.email).indexOf("@udea.edu.co") > -1)) {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        Alert.alert('Solo se pueden dominios del tipo @udea.edu.co');
        this.setState({
          entering: false,
        });
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
          <TouchableOpacity style={styles.googleStyle} activeOpacity={0.5}
            onPress={this.signInWithGoogleAsync}>
           <Image
            source={require('../assets/images/google.png')}
            style={styles.imageIconStyle}/>
           <View style={styles.separatorLine} />
           <Text style={styles.textStyle}> Entrar usando Google </Text>

         </TouchableOpacity>
        </View>
      );
    }else{
      return(
        <View style = {styles.container}>
          <ActivityIndicator size="large" color = "#fff" />
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
    backgroundColor: Colors.secondaryColor,
  },
  googleStyle: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: Colors.primaryColor,
   borderWidth: .5,
   borderColor: '#fff',
   height: 40,
   borderRadius: 5 ,
   margin: 5,
 },
 separatorLine :{
  backgroundColor : Colors.secondaryColor,
  width: 1,
  height: 40
},
imageIconStyle: {
   padding: 10,
   margin: 5,
   height: 25,
   width: 25,
   resizeMode : 'stretch',
},
textStyle: {
  fontFamily: 'RalewayRegular',
  color: Colors.whiteColor,
}

});
