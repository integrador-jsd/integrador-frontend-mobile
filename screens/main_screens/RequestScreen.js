import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import {FloatingAction} from 'react-native-floating-action';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';

import TabBarIcon from '../../components/TabBarIcon';
import ActiveScreen from '../request_screens/ActiveScreen';
import HistoryScreen from '../request_screens/HistoryScreen';

const config = Platform.select({
  web: {headerMode: 'screen'},
});


const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen,
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Activas'
};

ActiveStack.path = '';

const HistoryStack = createStackNavigator(
  {
    History: HistoryScreen,
  },
  config
);

HistoryStack.navigationOptions = {
  tabBarLabel: 'Historial'
};

HistoryStack.path = '';


const tabNavigator = createMaterialTopTabNavigator({
  ActiveStack,
  HistoryStack,
});

tabNavigator.path = '';
tabNavigator.navigationOptions = {
  header: null,
};

export default tabNavigator;
