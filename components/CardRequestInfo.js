import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import Colors from '../constants/Colors';
import * as Font from 'expo-font';
import Loader from './Loader';
import renderif from './RenderIf';



class CardRequestInfo extends React.PureComponent{
  state = {
    status: false,
    fontLoaded: false,
    date: '',
    start: '',
    end: '',
    sectional: '',
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
    if(this.props.isVisible && this.state.fontLoaded){
      this.state.date= (this.props.item.startTime).split("T")[0];
      this.state.start= (this.props.item.startTime).split("T")[1].split(".")[0];
      this.state.end= (this.props.item.endTime).split("T")[1].split(".")[0];
      if(this.props.item.sectionalID == 1){
        this.state.sectional = 'Sede principal';
      }
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
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Aula: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.props.item.roomID} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Tipo: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.props.item.request_type.type} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Seccional: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.state.sectional} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Estado: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.props.item.request_state.state} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Fecha: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.state.date} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Hora inicial: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.state.start} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}> Hora final: </Text>
                <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}> {this.state.end} </Text>
              </View>
              <View>
              <View style={{marginTop:20, flexDirection: 'row', backgroundColor: Colors.secondaryColor}}>
                {renderif(this.props.item.stateID === 1,
                  <TouchableOpacity style={[styles.textStyleOption, {alignItems:'flex-start', backgroundColor: 'red'}]} onPress={this.onPressRequest.bind(this)}>
                  <Text style={{color: Colors.whiteColor, fontSize:18, fontFamily: 'RalewayRegular'}}> Cancelar solicitud </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.textStyleOption, {alignItems:'center'}]}  onPress={this.onPressCancel.bind(this)}>
                  <Text style={{color: Colors.whiteColor, fontSize:18, fontFamily: 'RalewayRegular'}}> Atras </Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }else{
      return(
        <View/>
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
    justifyContent: 'center',
    height:40,
    flex: 1,
  },
});
