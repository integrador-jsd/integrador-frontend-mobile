import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { StyleSheet, View, Navigator} from 'react-native';
import MainTabNavigator from './navigation/MainTabNavigator';
import NewRequestScreen from './screens/request_screens/NewRequestScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import AddRequest from './components/AddRequest';



const App = createStackNavigator({
  MainTab: {screen: MainTabNavigator},
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
