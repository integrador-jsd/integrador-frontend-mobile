import {createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import {FloatingAction} from 'react-native-floating-action';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import ActiveScreen from '../request_screens/RequestManager';
import HistoryScreen from '../request_screens/HistoryScreen';
import Colors from '../../constants/Colors';

Font.loadAsync({
  RalewayRegular: require('../../assets/fonts/Raleway-SemiBold.ttf'),
});

const ActiveStack = createStackNavigator({
  Active: ActiveScreen,
});

ActiveStack.navigationOptions = {
  title: 'Activas',
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
    backgroundColor: Colors.primaryColor,
  },
  labelStyle: {
    fontSize: 17,
    fontFamily: 'RalewayRegular',
  },
  upperCaseLabel: false,
}
});

tabNavigator.path = '';
tabNavigator.navigationOptions = {
  header:null,
}


export default tabNavigator;
