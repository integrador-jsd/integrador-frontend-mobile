import React from 'react';
import { Platform, AsyncStorage, Image} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/main_screens/ProfileScreen';
import RequestScreen from '../screens/main_screens/RequestUserScreen';
import Colors from '../constants/Colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
});

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,

  },
  config
);
ProfileStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused }) => (
    <Image focused={focused} style={{ width: 25, height: 25 }} source={require('../assets/images/user.png')} />
  ),
};
ProfileStack.path = '';

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
  ProfileStack,
  RequestStack,
},
{
  initialRouteName: 'ProfileStack',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    activeTintColor: Colors.secondaryColor,
    inactiveTintColor: Colors.primaryColor,
  },
});

tabNavigator.navigationOptions = {
  header:null,
}

tabNavigator.path = '';

export default tabNavigator;
