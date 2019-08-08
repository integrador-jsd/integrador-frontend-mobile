import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/main_screens/HomeScreen';
import ScheduleScreen from '../screens/main_screens/ScheduleScreen';
import RequestScreen from '../screens/main_screens/RequestScreen';


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
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

RequestStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ScheduleStack,
  RequestStack,
});

tabNavigator.navigationOptions = {
  header:null,
}

tabNavigator.path = '';

export default tabNavigator;
