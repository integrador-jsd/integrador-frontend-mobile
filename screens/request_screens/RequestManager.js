import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation';


import ActiveScreen from './ActiveScreen';
import NewRequestScreen from './NewRequestScreen'

const Screens = createStackNavigator({
  Active: {screen: ActiveScreen},
  NewRequest: {screen: NewRequestScreen},
});

Screens.navigationOptions = {
  header:null,
}

export default Screens;
