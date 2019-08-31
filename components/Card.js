import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Colors from '../constants/Colors';

export default class Card extends React.PureComponent {
  constructor(props){
    super(props)

    this.state = {
        fontLoaded:false,
      }


  }

  async componentDidMount(){
    await Font.loadAsync({
      'RalewaySemiBold': require('../assets/fonts/Raleway-SemiBold.ttf'),
      'RalewayRegular': require('../assets/fonts/Raleway-Regular.ttf'),
      'RalewayExtraLight': require('../assets/fonts/Raleway-ExtraLight.ttf'),
    });
    this.setState({fontLoaded:true});
  }


  render(){
    if(this.state.fontLoaded){
      return (
        <TouchableOpacity style={styles.card}
          onPress={() => {Alert.alert('Informacion');}}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.cardTitle}> Bloque: </Text>
            <Text style={styles.cardType}> 19 </Text>
            <Text style={[styles.cardTitle,{marginLeft:15}]}>Aula: </Text>
            <Text style={[styles.cardType,]}> 201 </Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.cardTitle}> Tipo: </Text>
          <Text style={styles.cardType}> Auditorio </Text>
          </View>
          <Text style={styles.cardAbout}> click para mas informacion </Text>
        </TouchableOpacity>
      );
    }else{
      return(
        <AppLoading/>
      );
    }
  }
}


onPress = () => {
   console.log('Informacion aqui')
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  card: {
    backgroundColor : Colors.secondaryColor,
    marginLeft: '3%',
    marginTop: 5,
    width: '94%',
    shadowColor: '#ABEBC6',
    borderRadius: 5,
    elevation:3,
    shadowRadius: 1,
    shadowOffset: {
      width:3,
      height:3,
    }
  },
  cardTitle: {
    fontSize:18,
    fontFamily:'RalewaySemiBold',
    color: 'rgb(255,255,255)',
  },
  cardAbout: {
    fontSize: 14,
    color: 'rgb(255,255,255)',
    fontFamily:'RalewayExtraLight',
  },
  cardType:{
    fontSize: 15,
    color: 'rgb(255,255,255)',
    fontFamily:'RalewayRegular',
  }
});
