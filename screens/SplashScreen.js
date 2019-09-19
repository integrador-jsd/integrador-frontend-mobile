import React from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator
} from 'react-native';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';




class SplashScreen extends React.Component {

  componentDidMount(){
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTab' })],
        });
        this.props.navigation.dispatch(resetAction);
      }else{
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
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
