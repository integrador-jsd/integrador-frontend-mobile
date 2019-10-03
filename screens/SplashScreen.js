import React from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, AsyncStorage,
} from 'react-native';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';




class SplashScreen extends React.Component {

  componentDidMount(){
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    var userType = await AsyncStorage.getItem('user');
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        var resetAction;
        if((JSON.parse(userType)).data.userType == "2"){
              resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'MainTabAux' })],
          });
        }else{
              resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'MainTabUser' })],
          });
        }
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
