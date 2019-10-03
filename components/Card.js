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
        sectional: '',
        type: '',
      }


  }

  async componentDidMount(){
    await Font.loadAsync({
      'RalewaySemiBold': require('../assets/fonts/Raleway-SemiBold.ttf'),
      'RalewayMedium': require('../assets/fonts/Raleway-Medium.ttf'),
      'RalewayExtraLight': require('../assets/fonts/Raleway-ExtraLight.ttf'),
    });
    if(this.props.item.sectionalID == 1){
      this.setState({
        sectional: 'Sede principal',
      });
    }
    this.setState({
      fontLoaded:true,
    });
  }


  onPress() {
    this.props.callback(this.props.item);
  }


  render(){
    if(this.state.fontLoaded){
      return (
        <TouchableOpacity style={styles.card}
          onPress={() => this.onPress()}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.cardTitle}> Bloque: </Text>
            <Text style={styles.cardType}> {this.props.item.blockID} </Text>
            <Text style={[styles.cardTitle,{marginLeft:15}]}>Aula: </Text>
            <Text style={[styles.cardType,]}> {this.props.item.id} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.cardTitle}> Tipo: </Text>
          <Text style={styles.cardType}> {this.state.type} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.cardTitle}> Seccional: </Text>
          <Text style={styles.cardType}> {this.state.sectional} </Text>
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
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    shadowOffset: {
      width:3,
      height:3,
    }
  },
  cardTitle: {
    fontSize:15,
    fontFamily:'RalewaySemiBold',
    color: Colors.whiteColor,
  },
  cardAbout: {
    fontSize: 14,
    color: Colors.whiteColor,
    fontFamily:'RalewayExtraLight',
  },
  cardType:{
    fontSize: 15,
    color: Colors.whiteColor,
    fontFamily:'RalewayRegular',
  }
});
