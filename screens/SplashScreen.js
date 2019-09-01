import React from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator
} from 'react-native';
import firebase from 'firebase';




class SplashScreen extends React.Component {

  componentDidMount(){
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        this.props.navigation.navigate('MainTab');
      }else{
        this.props.navigation.navigate('Login');
      }
    }.bind(this));
  }

  render() {
    return(
      <View style = {styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
}

SplashScreen.navigationOptions = {
  header: null,
};

export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
});
