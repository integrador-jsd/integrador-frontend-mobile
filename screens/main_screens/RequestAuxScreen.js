import {createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import ActiveScreen from '../request_screens/ActiveScreen';
import HistoryScreen from '../request_screens/HistoryScreen';
import HelpScreen from '../request_screens/HelpScreen';
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

const HelpStack = createStackNavigator({
  Help: HelpScreen,
});

HelpStack.navigationOptions = {
  title: 'Ayudas',
  // tabBarIcon: ({focused}) =>{
  //     <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
  //       <IconBadge
  //         MainElement={
  //           <View style={{backgroundColor:'#489EFE',
  //             width:50,
  //             height:50,
  //             margin:6
  //           }}/>
  //         }
  //         BadgeElement={
  //           <Text style={{color:'#FFFFFF'}}>10</Text>
  //         }
  //         IconBadgeStyle={
  //           {width:30,
  //           height:30,
  //           backgroundColor: '#FF00EE'}
  //         }
  //         Hidden={1==0}
  //         />
  //     </View>
  // }
};

const tabNavigator = createMaterialTopTabNavigator({
  HelpStack,
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
},
initialRouteName: 'ActiveStack',
});

tabNavigator.path = '';
tabNavigator.navigationOptions = {
  header:null,
}


export default tabNavigator;
