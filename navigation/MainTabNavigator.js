import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/main_screens/HomeScreen';
import ScheduleScreen from '../screens/main_screens/ScheduleScreen';
import RequestScreen from '../screens/main_screens/RequestScreen';
import Colors from '../constants/Colors';
import * as Font from 'expo-font';

const config = Platform.select({
  web: { headerMode: 'screen' },
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,

  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Image focused={focused} style={{ width: 25, height: 25 }} source={require('../assets/images/home.png')} />
  ),
};

HomeStack.path = '';

const ScheduleStack = createStackNavigator(
  {
    Schedule: ScheduleScreen,
  },
  config
);

ScheduleStack.navigationOptions = {
  tabBarLabel: 'Horario',
  tabBarIcon: ({ focused }) => (
    <Image focused={focused} style={{ width: 25, height: 25 }} source={require('../assets/images/schedule.png')} />

  ),
};

ScheduleStack.path = '';

const RequestStack = createStackNavigator(
  {
    Request: RequestScreen,
  },
  config,
);

RequestStack.navigationOptions = {
  tabBarLabel: 'Solicitudes',
  tabBarIcon: ({ focused }) => (
    <Image focused={focused} style={{ width: 25, height: 25 }} source={require('../assets/images/request.png')} />
  ),
};

RequestStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ScheduleStack,
  RequestStack,
},
{
  initialRouteName: 'ScheduleStack',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    activeTintColor: Colors.secondaryColor,
    inactiveTintColor: Colors.primaryColor,
  },
}
);

tabNavigator.navigationOptions = {
  header:null,
}

tabNavigator.path = '';

export default tabNavigator;
