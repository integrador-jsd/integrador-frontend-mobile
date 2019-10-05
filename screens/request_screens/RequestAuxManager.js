import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation';


import ActiveScreen from './ActiveScreen';
import NewRequestScreen from './NewRequestScreen'
import HelpScreen from './HelpScreen';


const Screens = createStackNavigator({
  Active: {screen: ActiveScreen},
  NewRequest: {screen: NewRequestScreen},
  Help: {screen: HelpScreen}
});

Screens.navigationOptions = {
  header:null,
}

export default Screens;
