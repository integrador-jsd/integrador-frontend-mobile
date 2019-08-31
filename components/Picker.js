import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Colors from '../constants/Colors';

export default class Pickers extends Component {
  constructor(props){
    super(props)

    this.state = {
        user: '',
        fontLoaded:false,
      }
  }

   updateUser = (user) => {
      this.setState({ user: user})
   }

   async componentDidMount(){
     await Font.loadAsync({
       'RalewayRegular': require('../assets/fonts/Raleway-Regular.ttf'),
     });
     this.setState({fontLoaded:true});
   }

   render() {
     if(this.state.fontLoaded){
       return (
         <View style = {styles.picker}>
           <Picker style = {{flex:1}} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
              <Picker.Item label = {this.props.message} value = "bloque" />
              <Picker.Item label = "Ellen" value = "ellen" />
              <Picker.Item label = "Maria" value = "maria" />
           </Picker>
         </View>
       );
     }else{
       return (
         <AppLoading/>
       );
     }

   }
}

styles = StyleSheet.create({
  picker: {
    borderColor: Colors.primaryColor,
    width: '30%',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    marginLeft: '3%',
  }
});
