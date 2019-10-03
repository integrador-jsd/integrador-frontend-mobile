import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { StyleSheet, View, Navigator} from 'react-native';
import MainTabNavigatorAux from './navigation/MainTabNavigatorAux';
import MainTabNavigatorUser from './navigation/MainTabNavigatorUser';
import NewRequestScreen from './screens/request_screens/NewRequestScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import AddRequest from './components/AddRequest';



const App = createStackNavigator({
  MainTabUser: {screen: MainTabNavigatorUser},
  MainTabAux: {screen: MainTabNavigatorAux},
  NewRequest: {screen: NewRequestScreen},
  Login: {screen: LoginScreen},
  Splash: {screen: SplashScreen},

},

{
  initialRouteName: 'Splash',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});



export default createAppContainer(App);
