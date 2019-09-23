import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import Colors from '../constants/Colors';
import * as Font from 'expo-font';
import Loader from './Loader';



class CardRequestInfo extends React.PureComponent{
  state = {
    status: false,
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'RalewayBold': require('../assets/fonts/Raleway-Bold.ttf'),
      'RalewayRegular': require('../assets/fonts/Raleway-RegularItalic.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  onPressRequest(){
    this.state.status = true;
    this.props.callback(this.state.status);
    this.state.status = false;
  }

  onPressCancel(){
    this.props.callback(this.state.status);
  }

  render(){
    if(this.state.fontLoaded){
      return (
        <View style={{ flex: 1 }}>
          <Modal
          isVisible={this.props.isVisible}
          onBackButtonPress={this.onPressCancel.bind(this)}
          backdropTransitionOutTiming={0}
          style={{padding:10}}
          >
            <View style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius:8, opacity: 10}}>
              <View style={{backgroundColor: Colors.secondaryColor, padding:10, borderTopRightRadius: 8, borderTopLeftRadius: 8}}>
                <Text style={[styles.titleText, {color: Colors.whiteColor}]}> Solicitud </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Bloque: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.props.item.blockID} </Text>
                <Text style={styles.textStyle}>Aula: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.props.item.roomID} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Tipo: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.props.item.requestType} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Seccional: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.props.item.sectionalID} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Estado: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.props.item.stateID} </Text>
              </View>
              <View style={{paddingTop:20}}>
                <TouchableOpacity style={[styles.textStyleOption]} onPress={this.onPressRequest.bind(this)}>
                  <Text style={{color: Colors.whiteColor, fontSize:18, fontFamily: 'RalewayRegular'}}> Cancelar solicitud </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.textStyleOption]}  onPress={this.onPressCancel.bind(this)}>
                  <Text style={{color: Colors.whiteColor, fontSize:18, fontFamily: 'RalewayRegular'}}> Atras </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }else{
      return(
        <Loader loader={true} />
      );
    }
  }
}

export default CardRequestInfo;

CardRequestInfo.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontFamily: 'RalewayBold',
    flex: 0.5,
  },
  titleText: {
    color: Colors.primaryColor,
    fontSize: 28,
    fontFamily: 'RalewayBold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  textStyleOption: {
    alignItems: 'center',
    justifyContent:'center',
    borderTopColor: Colors.primaryColor,
    borderTopWidth: 1,
    backgroundColor:Colors.secondaryColor,
    height:40,
  },
});
