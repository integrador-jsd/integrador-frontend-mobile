import React from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, AsyncStorage, Image
} from 'react-native';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';




class SplashScreen extends React.Component {

  state={
    login: false,
  }

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
        this.setState({
          login:true,
        })
        setTimeout(() => {
          const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Login' })],
          });
          this.props.navigation.dispatch(resetAction);
        }, 2500);
      }
    }.bind(this));
  }

  render() {
    if(this.state.login){
      return(
        <View style = {styles.container}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{height: 400, width: 400}}
          />
        </View>
      );
    }else{
      return null;
    }

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
