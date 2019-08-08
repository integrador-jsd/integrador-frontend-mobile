import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import {FloatingAction} from 'react-native-floating-action';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';

import TabBarIcon from '../../components/TabBarIcon';
import ActiveScreen from '../request_screens/RequestManager';
import HistoryScreen from '../request_screens/HistoryScreen';


const ActiveStack = createStackNavigator({
  Active: ActiveScreen,
});

ActiveStack.navigationOptions = {
  title: 'Activo'
};

const HistoryStack = createStackNavigator({
  History: HistoryScreen
});

HistoryStack.navigationOptions = {
  title:'Historial',
};

const tabNavigator = createMaterialTopTabNavigator({
  ActiveStack,
  HistoryStack,
},
{tabBarOptions: {
  style: {
    backgroundColor: 'rgb(0,0,255)',
  },
}
});

tabNavigator.path = '';
tabNavigator.navigationOptions = {
  header:null,
};
tabNavigator.tabBarOptions

export default tabNavigator;
