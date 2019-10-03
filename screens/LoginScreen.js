import React from 'react';
import {
  View, Text, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity, AsyncStorage
} from 'react-native';
import * as Expo from 'expo';
import firebase from 'firebase';
import firebaseConfig from './config';
import Colors from '../constants/Colors';
import * as Font from 'expo-font';
import * as AppAuth from 'expo-app-auth';
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
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then(function(){
          firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
            fetch('https://integrador-jsd-backend.herokuapp.com/login', {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/json',
                idToken: idToken,
              }),
            })
            .then((response) => response.json())
            .then((responseJson) => this.storeData(responseJson));
          }.bind(this))
        }.bind(this))
      }
    }.bind(this));
  }


  storeData = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    global.userType = user.data.userType;
  } catch (error) {
    // Error saving data
  }
};


  signInWithGoogleAsync = async () => {
    this.setState({
      entering: true
    });
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '553884378564-le9276vg4q3adfhlr4ss3hktgols45tm.apps.googleusercontent.com',
        androidStandaloneAppClientId: '553884378564-le9276vg4q3adfhlr4ss3hktgols45tm.apps.googleusercontent.com',
        iosClientId: '553884378564-mmg1ak77r14gt59q63jhf628uthr4ejd.apps.googleusercontent.com',
        iosStandaloneAppClientId: '553884378564-mmg1ak77r14gt59q63jhf628uthr4ejd.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success' && ((result.user.email).indexOf("@udea.edu.co") > -1)) {
        this.onSignIn(result);

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

      console.log(e);
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
